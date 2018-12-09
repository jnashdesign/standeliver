import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, ToastController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {OrdersService} from '../../providers/orders-service-mock';
import {HomePage} from "../home/home";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  checkoutData: any;
  paymethods: string = 'creditcard';
  totalVal: number = 0;
  orderNumber: number = Math.floor(Math.random() * 10000);

  constructor(
    public nav: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public afd: AngularFireDatabase,
    public ordersService: OrdersService, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController) {
    this.checkoutData = this.navParams.data.orders;

  	this.checkoutData.forEach((val, i) => {
  		this.totalVal = this.totalVal + (val.order.price * val.qtd)
  	});

  	this.storage.set('order-' + this.orderNumber, this.checkoutData);
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
      message: 'Your order has been sent successfully! And will be delivered to ' + sessionStorage.getItem('seatLocation'),
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();

      this.ordersService.saveOrder(this.checkoutData, this.totalVal, this.orderNumber).then(data => {
        toast.present();
        this.storage.clear();
      })


      this.afd.list('restaurants/'+ sessionStorage.getItem('restaurant') +'/orders').update(
        JSON.stringify(this.orderNumber), 
          {
            'orderID': this.orderNumber,
            'total': this.totalVal,
            'items': this.navParams.data.orders
          }
        );
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }
}
