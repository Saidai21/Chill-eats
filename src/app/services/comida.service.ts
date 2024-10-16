import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener los platos desde la subcolección "Carta"
  obtenerComidas(): Observable<any[]> {
    return this.firestore
      .collection('Restaurantes')
      .doc('China')
      .collection('Carta')
      .valueChanges();  // Devuelve un Observable con los datos de la subcolección "Carta"
  }
}
