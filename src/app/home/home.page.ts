import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';

  constructor() {}

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName') || '';
    this.email = localStorage.getItem('email') || '';
  }
}
