import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comida-china',
  templateUrl: './comida-china.page.html',
  styleUrls: ['./comida-china.page.scss'],
})
export class ComidaChinaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    goToMainPage() {
    this.router.navigate(['/home']); 
  }
}
