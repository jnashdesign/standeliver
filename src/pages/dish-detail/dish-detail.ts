import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {CartPage} from '../cart/cart';

import {DishService} from '../../providers/dish-service-mock';
import {CartService} from '../../providers/cart-service-mock';

@Component({
    selector: 'page-dish-detail',
    templateUrl: 'dish-detail.html'
})
export class DishDetailPage {

  dish: any;
  qtd: number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController, 
    public dishService: DishService, 
    public cartService: CartService) {
    this.dish = this.navParams.data;
    dishService.findById(this.dish.id).then(
        dish => this.dish = dish
    );
  }

  // minus adult when click minus button
  minusQtd() {
    this.qtd--;
  }
  // plus adult when click plus button
  plusQtd() {
    this.qtd++;
  }

  addcart(dish, qtd) {
    let name = dish.name;
    this.cartService.addtoCart(dish, qtd)
      .then(dish => {
        let toast = this.toastCtrl.create({
            message: name + ' added to Cart',
            cssClass: 'mytoast',
            duration: 2000
        });
      toast.present(toast);
  	});
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

}
