import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { ItemDetailPage } from '../item-detail/item-detail';
import { CartService } from '../../providers/cart-service-mock';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})

export class CartPage {

    orders: Array<any> = [];
    extras: Array<any> = [];
    totalVal: number = 0;
    extrasum: number;
    options: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage: Storage,
      public cartService: CartService) {
    this.getOrders();
  }

  removeOrder (order) {
    this.cartService.removefromCart(order)
        .then(() => {
            this.getOrders();
        })
        .catch(error => alert(JSON.stringify(error)));
  }

  getSum(total, num) {
    return total + num;
  }

  getOrders() {
    this.cartService.getOrders().then(details => {
        this.orders = details;
        this.storage.set('orders',this.orders);
        this.totalVal = 0;
        this.extras;
    	this.orders.forEach((val, i) => {
            this.extras.push(val.details.extrasum);
            this.extrasum = this.extras.reduce(this.getSum);
            console.log(val.details);
            this.options = val.details.selectedOptions;
            this.totalVal = this.totalVal + (val.details.price * val.qtd);
    	});
    });
  }

  // minus adult when click minus button
  minusQtd(order) {
		this.cartService.editQtdOrder(order, 'minus')
      .then(() => {
          this.getOrders();
      })
      .catch(error => alert(JSON.stringify(error)));
  }

  // plus adult when click plus button
  plusQtd(order) {
		this.cartService.editQtdOrder(order, 'plus')
      .then(() => {
          this.getOrders();
      })
      .catch(error => alert(JSON.stringify(error)));
  }

  openCheckout() {
      this.navCtrl.push(CheckoutPage, {orders: this.orders});
  }

  editOrder(item){
    this.navCtrl.push(ItemDetailPage, item.details);
  }

}
