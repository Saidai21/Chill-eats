import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  userDoc :any;

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential; 
      if (user) {
        return user;
      } else {
        throw new Error('No se pudo obtener el usuario');
      }
    } catch (error: any) { 
      throw new Error(error.message || 'Error desconocido al iniciar sesión');
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: email,
          name: name,
        });

        // Crear una colección de direcciones
        await this.firestore.collection('users').doc(user.uid).collection('direcciones').add({
          address: null
        });
        

        return user;
      } else {
        throw new Error('No se pudo crear el usuario');
      }
    } catch (error: any) { 
      throw new Error(error.message || 'Error desconocido al registrar');
    }
  }

  async logout() {
    this.afAuth.signOut();
  }

  getUser(){
    return this.afAuth.user;
  }
}
