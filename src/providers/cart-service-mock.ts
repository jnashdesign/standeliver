import {Injectable} from '@angular/core';
import{Storage} from '@ionic/storage';

@Injectable()
export class CartService {

  orderCounter: number = 0;
  orders: Array<any> = [];
  options: any;

  constructor(
    public storage: Storage) {
}

  addtoCart(item, qtd) {
    this.orderCounter = this.orderCounter + 1;
    item.id = Math.floor(Math.random() * 1000);

    this.orders.push({
        id: this.orderCounter,
        details: item,
        extras: item.extrasum,
        options: item.selectedOptions,
        qtd: qtd,
        restaurant: sessionStorage.getItem('restaurant')
      });

    this.storage.set('orders',this.orders);

    return Promise.resolve();
  }

  removefromCart(order) {
    let index = this.orders.indexOf(order);
    if (index > -1) {
      this.orders.splice(index, 1);
    }
    return Promise.resolve();
  }

  editQtdOrder(order, op) {
    this.storage.get('orders')
        .then((orders)=>{
          if (orders){
          let index = orders.indexOf(order);
          console.log(orders);
          if (index > -1) {
            this.orders[index];
          }
      
          for (let i in this.orders) {
            if (this.orders[i].id === order.id) {
              if (op === 'minus') {
                this.orders[i].qtd--;
                break;
              }
              if (op === 'plus') {
                this.orders[i].qtd++;
                break;
              }
            }
          }
        }
    })

		return Promise.resolve();
  }

  // findAll() {
  //   return Promise.resolve(restaurants);
  // }

  // findById(id) {
  //   return Promise.resolve(restaurants[id - 1]);
  // }

  // findByName(searchKey: string) {
  //   let key: string = searchKey.toUpperCase();
  //   return Promise.resolve(restaurants.filter((restaurant: any) =>
  //       (restaurant.title +  ' ' +restaurant.address +  ' ' + restaurant.city + ' ' + restaurant.description).toUpperCase().indexOf(key) > -1));
  // }

  // getFavorites() {
  //   return Promise.resolve(this.favorites);
  // }

  // favorite(restaurant) {
  //   this.favoriteCounter = this.favoriteCounter + 1;
  //   this.favorites.push({id: this.favoriteCounter, restaurant: restaurant});
  //   return Promise.resolve();
  // }

  // unfavorite(favorite) {
  //   let index = this.favorites.indexOf(favorite);
  //   if (index > -1) {
  //     this.favorites.splice(index, 1);
  //   }
  //   return Promise.resolve();
  // }

}
