import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {DishDetailPage} from '../dish-detail/dish-detail';
import {RestaurantService} from '../../providers/restaurant-service-mock';
import {DishService} from '../../providers/dish-service-mock';
import {CartService} from '../../providers/cart-service-mock';
import {CartPage} from '../cart/cart';
import leaflet from 'leaflet';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-restaurant-detail',
    templateUrl: 'restaurant-detail.html'
})
export class RestaurantDetailPage {

    map;
    markersGroup;
    restaurant: any;
    restaurantopts: String = 'menu';
    food: Array<any>;

    constructor(
        public actionSheetCtrl: ActionSheetController, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public cartService: CartService, 
        public restaurantService: RestaurantService, 
        public dishService: DishService, 
        public afd: AngularFireDatabase,
        public toastCtrl: ToastController) {
        this.restaurant = this.navParams.data;
        console.log(this.restaurant);
        sessionStorage.setItem('restaurant',this.restaurant.id);
        this.getFood();
    }

    getFood() {
        this.afd.list('/restaurants/'+ this.restaurant.id +'/food')
        .valueChanges().subscribe((data) => {
          this.food = data;
        },
        (err)=>{ 
          console.log("problem : ", err)
        })
      }

    openDishDetail(food) {
        this.navCtrl.push(DishDetailPage, food);
    }

    favorite(restaurant) {
        this.restaurantService.favorite(restaurant)
            .then(restaurant => {
                let toast = this.toastCtrl.create({
                    message: 'Restaurant added to your favorites',
                    cssClass: 'mytoast',
                    duration: 2000
                });
                toast.present(toast);
            });
    }

    share(restaurant) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

	  openCart() {
	    this.navCtrl.push(CartPage);
	  }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);

        let marker: any = leaflet.marker([this.restaurant.lat, this.restaurant.long]);
        marker.data = this.restaurant;
        this.markersGroup.addLayer(marker);

        this.map.addLayer(this.markersGroup);
    }

    showMap() {
      setTimeout(() => {
          this.map = leaflet.map("map-detail").setView([this.restaurant.lat, this.restaurant.long], 16);
          leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri'
          }).addTo(this.map);
          this.showMarkers();
      }, 200)
    }

}
