import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  constructor(private aService:AuthService,private router:Router,private alertController:AlertController,private firestore: AngularFirestore) {}

async ngOnInit() {
    try {
        const data =  this.aService.obtenerUser();
        if (data) {
            this.userData = data;
            console.log('Datos del usuario:', this.userData);
        } else {
            console.error('No se encontraron datos del usuario.');
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout(){
    this.aService.logout();
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    this.presentAlert("Sesion Cerrada","Su sesion ha sido cerrada correctamente")
    this.router.navigate(["/iniciar-sesion"]);
  }
}
