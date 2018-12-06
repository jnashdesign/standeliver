import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {RestaurantService} from '../../providers/restaurant-service-mock';
import {RestaurantFilterPage} from '../restaurant-filter/restaurant-filter';
import {RestaurantDetailPage} from '../restaurant-detail/restaurant-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-nearby',
    templateUrl: 'nearby.html'
})
export class NearbyPage {

    restaurants: Array<any>;
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public service: RestaurantService, public modalCtrl: ModalController) {
        this.findAll();
    }

    openRestaurantFilterPage() {
      let modal = this.modalCtrl.create(RestaurantFilterPage);
      // modal.onDidDismiss(data => {
      //   console.log(data);
      // });
      modal.present();
    }

    openRestaurantDetail(restaurant: any) {
      this.navCtrl.push(RestaurantDetailPage, restaurant);
    }

    findAll() {
        this.service.findAll()
            .then(data => this.restaurants = data)
            .catch(error => alert(error));
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.restaurants.forEach(restaurant => {
            if (restaurant.lat, restaurant.long) {
                let marker: any = leaflet.marker([restaurant.lat, restaurant.long])
                    .on('click', event => this.openRestaurantDetail(restaurant));
                marker.data = restaurant;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.map = leaflet.map("nearby-map").setView([32.7478761, -97.0945991], 18);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

}
