import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {
  email: string = '';
  password: string = '';

  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';
  
  segment: string = 'login';

  
  constructor(
    private authService: AuthService, 
    private alertController: AlertController, 
    private router: Router  
  ) {}

  // Método para iniciar sesión
  login() {
    try {
      this.authService.login(this.email, this.password);
      this.presentAlert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente.');
      this.router.navigate(['/home']);
    } catch (error) {
      this.presentAlert('Error', 'Hubo un problema con el inicio de sesión.');
    }
    console.log('Login realizado');
  }
  
  // Método para registrarse
  async register() {
    if (this.registerPassword !== this.registerConfirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await this.authService.register(this.registerEmail, this.registerPassword, this.registerName);
      this.presentAlert('Registro exitoso', 'Tu cuenta ha sido creada.');
    } catch (error) {
      this.presentAlert('Error', 'Hubo un problema con el registro.');
    }
  }

  switchToRegister(event: Event) {
    event.preventDefault();
    this.segment = 'register';
  }

  switchToLogin(event: Event) {
    event.preventDefault();
    this.segment = 'login';
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
