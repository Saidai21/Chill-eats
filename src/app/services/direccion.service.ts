import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async agregarDireccion(nuevaDireccion: string) {
    const user = await this.afAuth.currentUser; // Resolvemos la promesa

    if (user) {
      const direccionesRef = this.firestore.collection('users').doc(user.uid).collection('direcciones');
      await direccionesRef.add({ label: nuevaDireccion });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  async cargarDirecciones() {
    const user = await this.afAuth.currentUser; // Resolvemos la promesa

    if (user) {
      const direccionesRef = this.firestore.collection('users').doc(user.uid).collection('direcciones');
      return await direccionesRef.snapshotChanges().toPromise();
    } else {
      throw new Error('Usuario no autenticado');
    }
  }
}
