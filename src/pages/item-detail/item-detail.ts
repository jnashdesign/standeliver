import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {CartPage} from '../cart/cart';
import {CartService} from '../../providers/cart-service-mock';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'page-item-detail',
    templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  item: any;
  options: any;
  qtd: number = 1;
  orderOptions = [];
  orderPrices = [];
  extrasum:number;
  // idNumber: number = Math.floor(Math.random() * 1000);


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController, 
    public storage: Storage,
    public cartService: CartService) {
    this.item = this.navParams.data;
    console.log(this.item);
    if (this.item.options){
      this.options = this.item.options;
      this.item.extrasum = 0;
      console.log(this.options);
    }
  }

  customizeToggle(){
    var x = document.getElementById("options");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  getSum(total, num) {
    return total + num;
  }

  chooseDrink(item, name, price){
    this.orderOptions = [];
    this.orderOptions.push(name);
    item.selectedOptions = this.orderOptions;
    this.orderPrices.push(price);
    item.extrasum = 0;
  }

  addToOrder(item, name, price){
    if(this.orderOptions.indexOf(name) === -1) {
      this.orderOptions.push(name);
      item.selectedOptions = this.orderOptions;
      this.orderPrices.push(price);
    }else{
      this.orderOptions.splice(this.orderOptions.indexOf(name),1);
      item.selectedOptions = this.orderOptions;
      this.orderPrices.splice(this.orderPrices.indexOf(price),1);
    }

    if (this.orderOptions.length > 0){
      item.extrasum = this.orderPrices.reduce(this.getSum);
    }else{
      item.extrasum = 0;
    }
    console.log(item);

    return;
  }

  // minus adult when click minus button
  minusQtd() {
    this.qtd--;
  }
  // plus adult when click plus button
  plusQtd() {
    this.qtd++;
  }

  addcart(item, qtd) {
    let name = item.name;
    this.cartService.addtoCart(item, qtd)
      .then(item => {
        let toast = this.toastCtrl.create({
            message: name + ' added to Cart',
            cssClass: 'mytoast',
            duration: 2000
        });
      toast.present(toast);
    });
    this.navCtrl.pop();
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

}
