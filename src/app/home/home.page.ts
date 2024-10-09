import { Component } from '@angular/core';
import { DireccionService } from '../services/direccion.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  direcciones: any[] = [];
  nuevaDireccion: string = '';

  constructor(private direccionService: DireccionService) {
    this.cargarDirecciones();
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
      await this.direccionService.agregarDireccion(this.nuevaDireccion);
      this.nuevaDireccion = ''; // Limpiar el campo
      this.cargarDirecciones(); // Recargar direcciones después de agregar
    } catch (error) {
      console.error('Error al agregar dirección:', error);
    }
  }
}
