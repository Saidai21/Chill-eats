import { Component, OnInit } from '@angular/core';
import { AnimationController,Animation } from '@ionic/angular';
@Component({
  selector: 'app-cupon-1',
  templateUrl: './cupon-1.page.html',
  styleUrls: ['./cupon-1.page.scss'],
})
export class Cupon1Page implements OnInit {
  private animation!:Animation;
  constructor(private aCtrl:AnimationController) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  ejecutar(){
  }
}
