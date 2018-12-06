import {Component} from '@angular/core';
import {Config, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import {RestaurantService} from '../../providers/restaurant-service-mock';
import {RestaurantFilterPage} from '../restaurant-filter/restaurant-filter';
import {RestaurantDetailPage} from '../restaurant-detail/restaurant-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-restaurant-list',
    templateUrl: 'restaurant-list.html'
})
export class RestaurantListPage {

    restaurants: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    proptype: string;
    from: string;
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: RestaurantService, public toastCtrl: ToastController, public modalCtrl: ModalController, public config: Config) {
        this.findAll();
        this.proptype = this.navParams.get('proptype') || "";
        this.from = this.navParams.get('from') || "";
        // console.log(this.proptype);
    }

    openFilterModal() {
      let modal = this.modalCtrl.create(RestaurantFilterPage);
      // modal.onDidDismiss(data => {
      //   console.log(data);
      // });
      modal.present();
    }

    openRestaurantDetail(restaurant: any) {
      this.navCtrl.push(RestaurantDetailPage, restaurant);
    }

    favorite(restaurant) {
        this.service.favorite(restaurant)
            .then(restaurant => {
                let toast = this.toastCtrl.create({
                    message: 'Property added to your favorites',
                    cssClass: 'mytoast',
                    duration: 2000
                });
                toast.present(toast);
            });
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.restaurants = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => this.restaurants = data)
            .catch(error => alert(error));
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([42.361132, -71.070876], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.restaurants.forEach(restaurant => {
            if (restaurant.lat, restaurant.long) {
                let marker: any = leaflet.marker([restaurant.lat, restaurant.long]).on('click', event => this.openRestaurantDetail(event.target.data));
                marker.data = restaurant;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
