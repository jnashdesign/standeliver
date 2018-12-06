import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrdersService } from '../../providers/orders-service-mock';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})

export class OrdersPage {

	lastOrders: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ordersService: OrdersService) {
    this.getOrders();
    // console.log(this.lastOrders);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad OrdersPage');
  // }

  getOrders() {
      this.ordersService.getOrders()
          .then(data => {
          	console.log(data);
          	this.lastOrders = data
          });
  }

}
