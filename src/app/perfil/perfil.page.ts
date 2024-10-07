import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  constructor(private aService:AuthService,private router:Router,private alertController:AlertController) {}

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName') || '';
    this.email = localStorage.getItem('email') || '';
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
