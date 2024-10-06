import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Registro de usuario
  async register(email: string, password: string, name: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        // Almacenar el usuario en Firestore
        return this.firestore.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          name: name
        });
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error;
    }
  }

  // Inicio de sesión de usuario
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
}
