import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController, Animation } from '@ionic/angular';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  private animation!:Animation;
  constructor(private alertController: AlertController,
    private animationController: AnimationController) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Su pedido ha sido comprado con éxito',
      buttons: ['Salir'],
    });

    await alert.present();
  }

  ngAfterViewInit(){
    const moveAnimation = this.animationController.create()
    .addElement(document.querySelector('.moto') as HTMLElement)
    .duration(2200)
    .iterations(Infinity) 
    .fromTo('transform','translateX(-300px)','translateX(600px)')

    const opacityAnimation = this.animationController.create()
      .addElement(document.querySelector('.texto') as HTMLElement)
      .duration(900)
      .iterations(Infinity)
      .fromTo('opacity', '1', '0.5');


    this.animation = this.animationController.create()
      .addAnimation([moveAnimation, opacityAnimation]);
  }
  ejecutar(){
    this.animation.play()
  }
}
