import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, PopoverController, ModalController } from 'ionic-angular';

import {SettingsPage} from '../settings/settings';
import {RestaurantListPage} from '../restaurant-list/restaurant-list';
import {RestaurantService} from '../../providers/restaurant-service-mock';
import {RestaurantDetailPage} from '../restaurant-detail/restaurant-detail';
import {RestaurantFilterPage} from '../restaurant-filter/restaurant-filter';
import {NotificationsPage} from '../notifications/notifications';
import {NearbyPage} from '../nearby/nearby';
import {MessageListPage} from '../message-list/message-list';
import {CategoryPage} from '../category/category';
import {OrdersPage} from '../orders/orders';
import {CartPage} from '../cart/cart';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { FcmProvider } from '../../providers/fcm/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  restaurants: Array<any>;
  messages: Array<any>;
  searchKey: string = "";
  yourLocation: string = "";
  stadiumIMG: any;
  stadium: string;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController, 
    public locationCtrl: AlertController, 
    public modalCtrl: ModalController, 
    public toastCtrl: ToastController,
    public afd: AngularFireDatabase,
    public storage: Storage,
    public fcm: FcmProvider,
    public service: RestaurantService) {
    this.findAll();
    if(sessionStorage.getItem('currentLocation') == null){
      // do nothing
    }else{
      if (sessionStorage.getItem('currentLocation') == 'Kincaid Stadium'){
        this.stadiumIMG = 'assets/img/kincaid.jpg';
        this.stadium = sessionStorage.getItem('currentLocation')
      } else {
        this.stadiumIMG = 'assets/img/Forester-Athletic-Complex.jpg';
        this.stadium = sessionStorage.getItem('currentLocation')
      }
    }
  }

  ionViewDidLoad() {
    if (sessionStorage.getItem('currentLocation') == null){
      document.getElementById('restaurants').style.display='none';
      document.getElementById('stadium').style.display='none';
      this.setLocation();
    }
  }

  ionViewWillEnter() {
    this.fcm.getToken();
    this.navCtrl.canSwipeBack();
    sessionStorage.removeItem('restaurant');
    if (sessionStorage.getItem('seatLocation') == null){
      this.yourLocation = 'Not Set';
    } else {
      this.yourLocation = sessionStorage.getItem('seatLocation');
    }
    this.getMessages();
  }

  openRestaurantListPage(proptype) {
  	this.navCtrl.push(RestaurantListPage, proptype);
  }

  openRestaurantFilterPage() {
    let modal = this.modalCtrl.create(RestaurantFilterPage);
    modal.present();
  }

  openNearbyPage() {
    this.navCtrl.push(NearbyPage);
  }

  openOrders() {
    this.navCtrl.push(OrdersPage);
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

	openRestaurantDetail(restaurant: any) {
	    this.navCtrl.push(RestaurantDetailPage, restaurant);
	}

  openSettingsPage() {
  	this.navCtrl.push(SettingsPage);
  }

  openNotificationsPage() {
  	this.navCtrl.push(NotificationsPage);
  }

  openCategoryPage() {
    this.navCtrl.push(CategoryPage);
  }

	onInput(event) {
	    this.service.findByName(this.searchKey)
	        .then(data => {
	            this.restaurants = data;
	        })
	        .catch(error => alert(JSON.stringify(error)));
	}

	onCancel(event) {
	    this.findAll();
	}

	findAll() {
    this.afd.list('/restaurants')
    .valueChanges().subscribe((data) => {
      this.restaurants = data;
    },
    (err)=>{ 
      console.log("problem : ", err)
    })
  }

    setLocation() {
    let setLocation = this.locationCtrl.create({
      title: 'Set Location',
      message: "Choose stadium to see available concession stands.",
      buttons: [
        {
          text: 'Kincaid Stadium',
          handler: data => {
            console.log('Change clicked', data);
            sessionStorage.setItem('currentLocation','Kincaid Stadium');
            document.getElementById('restaurants').style.display='block';
            document.getElementById('stadium').style.display='block';
            this.stadiumIMG = 'assets/img/kincaid.jpg';
            this.stadium = 'Kincaid Stadium';
            let toast = this.toastCtrl.create({
              message: 'Concessions for Kincaid Stadium now available.',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        },
        {
          text: 'Forester Athletic Complex',
          handler: data => {
            console.log('Change clicked', data);
            sessionStorage.setItem('currentLocation','Forester Athletic Complex');
            document.getElementById('restaurants').style.display='block';
            document.getElementById('stadium').style.display='block';
            this.stadiumIMG = 'assets/img/Forester-Athletic-Complex.jpg';
            this.stadium = 'Forester Athletic Complex';
            let toast = this.toastCtrl.create({
              message: 'Concessions for Forester Athletic Complex now available.',
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
    setLocation.present();
  }

  // setLocation() {
  //   let setLocation = this.locationCtrl.create({
  //     title: 'Set Location',
  //     message: "It appears you're at AT&T Stadium. Is this correct?",
  //     buttons: [
  //       {
  //         text: 'No',
  //         handler: data => {
  //           console.log('No clicked');
  //         }
  //       },
  //       {
  //         text: 'Yes',
  //         handler: data => {
  //           console.log('Change clicked', data);
  //           sessionStorage.setItem('currentLocation','AT&T Stadium');
  //           document.getElementById('restaurants').style.display='block';
  //           document.getElementById('stadium').style.display='block';
  //           let toast = this.toastCtrl.create({
  //             message: 'Concessions for AT&T Stadium now available.',
  //             duration: 3000,
  //             position: 'top',
  //             closeButtonText: 'OK',
  //             showCloseButton: true
  //           });
  //           toast.present();
  //         }
  //       }
  //     ]
  //   });
  //   setLocation.present();
  // }

  alertLocation() {
    let changeLocation = this.locationCtrl.create({
      title: 'We Need Your Seat Location For Delivery',
      message: "Please type your seat and section number you want your food delivered.",
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

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

  getMessages(){
    this.afd.list('/users/' + localStorage.getItem('userID')+'/messages/')
      .valueChanges().subscribe((data) => {
        this.messages = data;
        this.storage.set('messages',this.messages);
        console.log('messages: '+JSON.stringify(this.messages));
      },
      (err)=>{ 
        console.log("problem : ", err)
      })
  }
}
