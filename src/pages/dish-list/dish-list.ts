import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DishService} from '../../providers/dish-service-mock';
import {DishDetailPage} from '../dish-detail/dish-detail';

@Component({
    selector: 'page-dish-list',
    templateUrl: 'dish-list.html'
})
export class DishListPage {

    dishes: Array<any>;

    constructor(public navCtrl: NavController, public service: DishService) {
        service.findAll().then(data => this.dishes = data);
    }

    openDishDetail(broker) {
        this.navCtrl.push(DishDetailPage, broker);
    }

}
