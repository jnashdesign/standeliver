import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RestaurantService} from '../../providers/restaurant-service-mock';
import {RestaurantDetailPage} from '../restaurant-detail/restaurant-detail';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})

export class FavoriteListPage {

    favorites: Array<any> = [];

    constructor(public navCtrl: NavController, public service: RestaurantService) {
        this.getFavorites();
        console.log(this.favorites);
    }

    itemTapped(favorite) {
        this.navCtrl.push(RestaurantDetailPage, favorite.restaurant);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
