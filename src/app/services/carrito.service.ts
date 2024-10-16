import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    const user = await this.afAuth.currentUser; 

    if (user) {
      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
      await carritoRef.add(producto);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  async cargarCarrito() {
    const user = await this.afAuth.currentUser; 

    if (user) {
      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
      return await carritoRef.snapshotChanges().toPromise();
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  async eliminarProducto(productoId: string) {
    const user = await this.afAuth.currentUser;

    if (user) {
      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito').doc(productoId);
      await carritoRef.delete();
    } else {
      throw new Error('Usuario no autenticado');
    }
  }
}
