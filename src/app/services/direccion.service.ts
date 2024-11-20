import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Agregar un producto al carrito
  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    try {
      const user = await this.afAuth.currentUser;

      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
      await carritoRef.add(producto);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  }

  // Cargar el carrito de forma reactiva
  cargarCarrito(): Observable<any[]> {
    return new Observable(observer => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
          carritoRef.valueChanges().subscribe(
            productos => observer.next(productos),
            error => observer.error(error)
          );
        } else {
          observer.error('Usuario no autenticado');
        }
      }).catch(error => observer.error(error));
    });
  }

  // Eliminar un producto del carrito
  async eliminarProducto(productoId: string) {
    try {
      const user = await this.afAuth.currentUser;

      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito').doc(productoId);
      await carritoRef.delete();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
}
