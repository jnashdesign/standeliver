import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-restaurant-filter',
  templateUrl: 'restaurant-filter.html',
})

export class RestaurantFilterPage {
	minmaxprice: any;
	radiusmiles: Number;

  constructor(public navCtrl: NavController) {

  	this.radiusmiles = 1;

		this.minmaxprice = {
  		upper:500,
  		lower:10
  	};

  }

  closeModal() {
    this.navCtrl.pop();
  }

}
