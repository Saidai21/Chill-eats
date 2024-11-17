import { Component, OnInit  } from '@angular/core';
import { DireccionService } from '../services/direccion.service'; // Ajusta la ruta según tu estructura
import * as L from 'leaflet';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  direcciones: any[] = [];
  nuevaDireccion: string = '';
  direccionIngresada: string = ''; // Dirección ingresada por el usuario
  mapa!: L.Map;
  marker!: L.Marker; 
  constructor(private direccionService: DireccionService) {
    this.cargarDirecciones();
  }


  ngOnInit() {
    this.cargarDirecciones();
  }

  iniciarMapa(){
    this.mapa = L.map('mapa', {
      center: [-33.4489, -70.6693], // Coordenadas de Santiago
      zoom: 12, // Nivel de zoom inicial
      doubleClickZoom: false, // Desactiva el zoom con doble clic
      boxZoom: false, // Desactiva el zoom con selección de área
      touchZoom: false, // Desactiva el zoom táctil
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 0);

    this.marker = L.marker([-33.4489, -70.6693]).addTo(this.mapa);
  }

  async buscarDireccion() {
    if (!this.direccionIngresada) {
      alert('Por favor, ingresa una dirección.');
      return;
    }
  
    try {
      // URL para hacer la solicitud a Nominatim
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.direccionIngresada)}`;
      
      // Solicitud con fetch
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0]; // Extrae las coordenadas
        const coords: L.LatLngTuple = [parseFloat(lat), parseFloat(lon)]; // Convierte a LatLngTuple
  
        // Centra el mapa en las coordenadas encontradas
        this.mapa.setView(coords, 20);
  
        // Actualiza el marcador a la nueva ubicación
        this.marker.setLatLng(coords).bindPopup(this.direccionIngresada).openPopup();
  
        console.log(`Dirección encontrada: ${this.direccionIngresada}`, coords);
      } else {
        alert('No se encontró la dirección. Por favor, intenta con otra.');
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
      alert('Ocurrió un error al buscar la dirección.');
    }
  }

  async cargarDirecciones() {
    try {
      const snapshot = await this.direccionService.cargarDirecciones();
    } catch (error) {
      console.error('Error al cargar direcciones:', error);
    }
  }

  async agregarDireccion() {
    try {
      if(this.direccionIngresada!=null && this.direccionIngresada!=" "){
        await this.direccionService.agregarDireccion(this.direccionIngresada);
        alert("Direccion Agregada")
        this.direccionIngresada = ''; // Limpiar el campo
        this.cargarDirecciones(); // Recargar direcciones después de agregar
      }else{
        alert("Ingrese una dirección valida")
      }
    } catch (error) {
      console.error('Error al agregar dirección:', error);
    }
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
}
