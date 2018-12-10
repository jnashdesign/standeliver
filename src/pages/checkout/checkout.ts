import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, ToastController, AlertController} from "ionic-angular";
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
  yourLocation: string = "";

  constructor(
    public nav: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    public afd: AngularFireDatabase,
    public ordersService: OrdersService,
    public locationCtrl: AlertController,
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

    if (sessionStorage.getItem('seatLocation') == null){
      this.alertLocation();
    } else {
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

      this.ordersService.saveOrder(this.checkoutData, this.totalVal, this.orderNumber)
        .then(data => {
          toast.present();
          this.storage.clear();
      })

      var today = new Date();
      var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = time+' ('+date+')';

      this.afd.list('restaurants/'+ sessionStorage.getItem('restaurant') +'/orders')
      .update(
        JSON.stringify(this.orderNumber), 
          {
            'orderID': this.orderNumber,
            'orderTime': dateTime,
            'seatNum':  sessionStorage.getItem('seatLocation'),
            'total': this.totalVal,
            'items': this.navParams.data.orders
          }
        );
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }
}

alertLocation() {
  let changeLocation = this.locationCtrl.create({
    title: 'We Need Your Seat Location For Delivery',
    message: "Please type your seat and section number you want your food delivered to.",
    inputs: [
      {
        name: 'location',
        placeholder: 'Enter your seat Location',
        type: 'text'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Done',
        handler: data => {
          console.log('Change clicked', data);
          sessionStorage.setItem('seatLocation', data.location);
          this.yourLocation = data.location;
          let toast = this.toastCtrl.create({
            message: 'Seat was successfully updated.',
            duration: 3000,
            position: 'top',
            closeButtonText: 'OK',
            showCloseButton: true
          });
          toast.present();
        }
      }
    ]
  });
  changeLocation.present();
}

}
