import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: 'hamburguesa.page.html',
  styleUrls: ['hamburguesa.page.scss'],
})
export class HamburguesaPage {
  productos = [
    {
      id: '1',
      nombre: 'Hamburguesa Clásica',
      precio: 7000,
      imagen: 'https://assets.unileversolutions.com/recipes-v2/218401.jpg',
    },
    {
      id: '2',
      nombre: 'Hamburguesa Bacon',
      precio: 8500,
      imagen: 'https://assets.unileversolutions.com/recipes-v2/232001.jpg',
    },
    {
      id: '3',
      nombre: 'Hamburguesa BBQ',
      precio: 9000,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqnZ-MFsT5EgqJTOxMZrGPiLjcEcA8kA7tA&s',
    },
    {
      id: '4',
      nombre: 'Hamburguesa Vegetariana',
      precio: 7500,
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1WwBst48W8AjNOf8HUvowXZuyL1OOjdjrAQ&s',
    },
    {
      id: '5',
      nombre: 'Hamburguesa Triple',
      precio: 10000,
      imagen: 'https://cdn.pedix.app/W0AsEiy0lKAARE913TEH/products/1655161847947.png?size=800x800',
    },
  ];

  constructor(private carritoService: CarritoService) {}

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    await this.carritoService.agregarProducto(producto);
  }

  goToMainPage() {
  }
}
