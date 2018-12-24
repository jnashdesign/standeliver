import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ItemService} from '../../providers/item-service-mock';
import {ItemDetailPage} from '../item-detail/item-detail';

@Component({
    selector: 'page-item-list',
    templateUrl: 'item-list.html'
})
export class ItemListPage {

    items: Array<any>;

    constructor(
        public service: ItemService,
        public navCtrl: NavController) {
        service.findAll().then(data => this.items = data);
    }

    openItemDetail(broker) {
        this.navCtrl.push(ItemDetailPage, broker);
    }

}
