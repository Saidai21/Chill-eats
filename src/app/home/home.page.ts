import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
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
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.fullName = params['fullName'] || '';
      this.email = params['email'] || '';
      this.phone = params['phone'] || '';
      this.address = params['address'] || ''
    });
  }

}
