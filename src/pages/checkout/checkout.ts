import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {OrdersService} from '../../providers/orders-service-mock';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  checkoutData: any;
  paymethods: string = 'creditcard';
  totalVal: number = 0;
  orderNumber: number = Math.floor(Math.random() * 10000);

  constructor(public nav: NavController, public navParams: NavParams, private storage: Storage, public ordersService: OrdersService, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.checkoutData = this.navParams.data.orders;

  	this.checkoutData.forEach((val, i) => {
  		this.totalVal = this.totalVal + (val.order.price * val.qtd)
  	});

  	this.storage.set('order-' + this.orderNumber, this.checkoutData);
    console.log(this.checkoutData);
  }

  // process send button
  send() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Your order has been sent successfully! And will be delivered to ' + localStorage.getItem('seatLocation'),
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();

      this.ordersService.saveOrder(this.checkoutData, this.totalVal, this.orderNumber).then(data => {
      	toast.present();
      })
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }
}
