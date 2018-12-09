webpackJsonp([0],{

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_restaurant_service_mock__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__restaurant_filter_restaurant_filter__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__restaurant_detail_restaurant_detail__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RestaurantListPage = (function () {
    function RestaurantListPage(navCtrl, navParams, service, toastCtrl, modalCtrl, config) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.config = config;
        this.searchKey = "";
        this.viewMode = "list";
        this.findAll();
        this.proptype = this.navParams.get('proptype') || "";
        this.from = this.navParams.get('from') || "";
        // console.log(this.proptype);
    }
    RestaurantListPage.prototype.openFilterModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__restaurant_filter_restaurant_filter__["a" /* RestaurantFilterPage */]);
        // modal.onDidDismiss(data => {
        //   console.log(data);
        // });
        modal.present();
    };
    RestaurantListPage.prototype.openRestaurantDetail = function (restaurant) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__restaurant_detail_restaurant_detail__["a" /* RestaurantDetailPage */], restaurant);
    };
    RestaurantListPage.prototype.favorite = function (restaurant) {
        var _this = this;
        this.service.favorite(restaurant)
            .then(function (restaurant) {
            var toast = _this.toastCtrl.create({
                message: 'Property added to your favorites',
                cssClass: 'mytoast',
                duration: 2000
            });
            toast.present(toast);
        });
    };
    RestaurantListPage.prototype.onInput = function (event) {
        var _this = this;
        this.service.findByName(this.searchKey)
            .then(function (data) {
            _this.restaurants = data;
            if (_this.viewMode === "map") {
                _this.showMarkers();
            }
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    RestaurantListPage.prototype.onCancel = function (event) {
        this.findAll();
    };
    RestaurantListPage.prototype.findAll = function () {
        var _this = this;
        this.service.findAll()
            .then(function (data) { return _this.restaurants = data; })
            .catch(function (error) { return alert(error); });
    };
    RestaurantListPage.prototype.showMap = function () {
        var _this = this;
        setTimeout(function () {
            _this.map = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.map("map").setView([42.361132, -71.070876], 14);
            __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(_this.map);
            _this.showMarkers();
        });
    };
    RestaurantListPage.prototype.showMarkers = function () {
        var _this = this;
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.layerGroup([]);
        this.restaurants.forEach(function (restaurant) {
            if (restaurant.lat, restaurant.long) {
                var marker = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.marker([restaurant.lat, restaurant.long]).on('click', function (event) { return _this.openRestaurantDetail(event.target.data); });
                marker.data = restaurant;
                _this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    };
    RestaurantListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-restaurant-list',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/restaurant-list/restaurant-list.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <span ion-text>Restaurants</span>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="openFilterModal()">\n        <ion-icon name="options"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]="searchKey" (ionInput)="onInput($event)" (ionCancel)="onCancel($event)"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="lightest-bg">\n\n\n	<ion-list *ngIf="from !== \'home\'">\n	  <ion-item>\n	    <ion-label class="fw700">Restaurant type:</ion-label>\n	    <ion-select [(ngModel)]="proptype">\n	      <ion-option value="">All categories</ion-option>\n	      <ion-option value="Barbecue">Stadium Food</ion-option>\n	    </ion-select>\n	  </ion-item>\n	</ion-list>\n\n<!-- 	<div padding *ngIf="from !== \'home\'">\n	  <ion-segment [(ngModel)]="proptype">\n	    <ion-segment-button value="">\n	      All\n	    </ion-segment-button>\n	    <ion-segment-button value="sale">\n	      For Sale\n	    </ion-segment-button>\n	    <ion-segment-button value="rent">\n	      For Rent\n	    </ion-segment-button>\n	  </ion-segment>\n	</div> -->\n\n  <div *ngIf="viewMode === \'list\'">\n      <ion-card *ngFor="let restaurant of restaurants | termSearch:proptype:\'tags\'" margin-bottom>\n        <div class="card-img-wrap">\n          <ion-fab bottom right edge>\n            <button ion-fab mini (click)="favorite(restaurant)">\n              <ion-icon name="heart"></ion-icon>\n            </button>\n          </ion-fab>\n          <img src="{{restaurant.thumbnail}}" tappable (click)="openRestaurantDetail(restaurant)">\n          <span ion-text class="card-img-price fw700 text-black">\n            {{ restaurant.tags }}\n          </span>\n          <span ion-text class="card-img-status fw500 text-white" [ngClass]="{\'closed\': restaurant.label === \'closed\', \'open\': restaurant.label === \'open\'}">\n            {{ restaurant.label }}\n          </span>\n        </div>\n        <ion-card-content>\n          <ion-card-title ion-text color="dark" class="fw700" tappable (click)="openRestaurantDetail(restaurant)" no-margin no-padding>\n            {{restaurant.title}}\n          </ion-card-title>\n          <p ion-text color="primary" no-margin>\n            {{restaurant.city}}, {{restaurant.state}} • <span ion-text class="fw700">{{ restaurant.price }}</span>\n          </p>\n          <hr>\n          	<ion-badge color="secondary">\n							<ion-icon name="star"></ion-icon>\n	          	{{ restaurant.rating | number:\'1.1\' }}\n	          </ion-badge>\n        </ion-card-content>\n      </ion-card>\n  </div>\n\n  <div *ngIf="viewMode === \'map\'" style="width:100%;height:100%;" id="map"></div>\n\n</ion-content>\n\n<ion-footer padding>\n    <ion-segment [(ngModel)]="viewMode">\n        <ion-segment-button value="list">\n            <ion-icon name="list"></ion-icon>\n        </ion-segment-button>\n        <ion-segment-button value="map" (ionSelect)="showMap()">\n            <ion-icon name="map"></ion-icon>\n        </ion-segment-button>\n    </ion-segment>\n</ion-footer>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/restaurant-list/restaurant-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_restaurant_service_mock__["a" /* RestaurantService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */]])
    ], RestaurantListPage);
    return RestaurantListPage;
}());

//# sourceMappingURL=restaurant-list.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DishDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dish_service_mock__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cart_service_mock__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DishDetailPage = (function () {
    function DishDetailPage(navCtrl, navParams, toastCtrl, dishService, cartService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.dishService = dishService;
        this.cartService = cartService;
        this.qtd = 1;
        this.dish = this.navParams.data;
        dishService.findById(this.dish.id).then(function (dish) { return _this.dish = dish; });
    }
    // minus adult when click minus button
    DishDetailPage.prototype.minusQtd = function () {
        this.qtd--;
    };
    // plus adult when click plus button
    DishDetailPage.prototype.plusQtd = function () {
        this.qtd++;
    };
    DishDetailPage.prototype.addcart = function (dish, qtd) {
        var _this = this;
        var name = dish.name;
        this.cartService.addtoCart(dish, qtd)
            .then(function (dish) {
            var toast = _this.toastCtrl.create({
                message: name + ' added to Cart',
                cssClass: 'mytoast',
                duration: 2000
            });
            toast.present(toast);
        });
    };
    DishDetailPage.prototype.openCart = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
    };
    DishDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dish-detail',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/dish-detail/dish-detail.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>\n            <span ion-text>{{dish.name}}</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="dish lightest-bg">\n\n  <ion-card class="dish-card">\n\n    <ion-card-content class="profiles-bg">\n			<div class="picture-frame">\n					<img [src]="dish.picture">\n			<div class="price">\n					<h1 ion-text class="text-white fw700">{{ dish.price | currency:\'USD\':true }}</h1>\n			</div>\n			</div>\n			<div padding>\n	      <ion-grid class="filters" no-padding>\n	        <!-- <ion-row margin-bottom>\n	          <ion-col text-center>\n	          	<h4 ion-text color="light">Price</h4>\n	            <h1 ion-text class="text-white fw700">{{ dish.price | currency:\'USD\':true }}</h1>\n	          </ion-col>\n	        </ion-row> -->\n	        <ion-row margin-bottom>\n	          <ion-col text-center>\n	            <ion-icon name="remove-circle" class="circle" tappable (click)="minusQtd()" [hidden]="qtd < 2"\n	                      color="secondary"></ion-icon>\n	          </ion-col>\n	          <ion-col width-10 text-center>\n	          	<h4 ion-text color="light">Quantity:</h4>\n	          	<h2 ion-text>{{ qtd }}</h2>\n	          </ion-col>\n	          <ion-col width-10 text-center>\n	            <ion-icon name="add-circle" class="circle" tappable (click)="plusQtd()" color="secondary"></ion-icon>\n						</ion-col>\n						<ion-col>\n								<button ion-button color="secondary" icon-left tappable (click)="addcart(dish, qtd)">\n										<!-- Add to Cart ({{ dish.price * qtd | currency:\'USD\':true }}) -->\n										Add to Cart\n									</button>\n						</ion-col>\n	        </ion-row>\n	        <!-- <ion-row>\n				<ion-col text-center>\n		      <button ion-button color="secondary" icon-left tappable (click)="addcart(dish, qtd)">\n		      	Add to Cart ({{ dish.price * qtd | currency:\'USD\':true }})\n		      </button>\n				</ion-col>\n	        </ion-row> -->\n	      </ion-grid>\n			</div>\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-card>\n    <ion-card-content>\n      <h2 ion-text color="primary" class="fw500">Ingredients</h2>\n      <p ion-text>{{dish.ingredients}}</p>\n			<hr>\n      <h2 ion-text color="primary" class="fw500">Description</h2>\n      <p ion-text>{{dish.description}}</p>\n    </ion-card-content>\n  </ion-card>\n\n  <br><br><br><br><br>\n\n  <ion-fab bottom right>\n    <button ion-fab round icon-only color="dark" (click)="openCart()">\n      <ion-icon name="cart" class="text-white"></ion-icon>\n    </button>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/dish-detail/dish-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_dish_service_mock__["a" /* DishService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_cart_service_mock__["a" /* CartService */]])
    ], DishDetailPage);
    return DishDetailPage;
}());

//# sourceMappingURL=dish-detail.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var OrdersService = (function () {
    function OrdersService() {
        this.orderCounter = 0;
        this.orders = [];
    }
    OrdersService.prototype.saveOrder = function (order, total, orderNumber) {
        this.orderCounter = this.orderCounter + 1;
        this.orders.push({ id: this.orderCounter, order: order, total: total, onumber: orderNumber });
        return Promise.resolve();
    };
    OrdersService.prototype.getOrders = function () {
        return Promise.resolve(this.orders);
    };
    OrdersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], OrdersService);
    return OrdersService;
}());

//# sourceMappingURL=orders-service-mock.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_message_service_mock__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__message_detail_message_detail__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessageListPage = (function () {
    function MessageListPage(navCtrl, afd, service) {
        this.navCtrl = navCtrl;
        this.afd = afd;
        this.service = service;
        this.messages = [];
    }
    MessageListPage.prototype.ionViewWillLoad = function () {
        this.getMessages();
    };
    MessageListPage.prototype.itemTapped = function (message) {
        // console.log('itemTapped: ', message);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__message_detail_message_detail__["a" /* MessageDetailPage */], message);
    };
    MessageListPage.prototype.deleteItem = function (message) {
        var _this = this;
        this.service.delMessage(message)
            .then(function () {
            _this.getMessages();
            // console.log('deleteItem: ', this.messages)
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    MessageListPage.prototype.getMessages = function () {
        var _this = this;
        this.afd.list('/users/' + localStorage.getItem('userID') + '/messages/')
            .valueChanges().subscribe(function (data) {
            _this.messages = data;
            console.log('messages: ' + _this.messages);
        }, function (err) {
            console.log("problem : ", err);
        });
    };
    MessageListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-message-list',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/message-list/message-list.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n        	<span ion-text>Messages</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="lightest-bg">\n    <ion-card *ngIf="!messages.length" class="primary-bg" margin-top>\n      <ion-card-content>\n      	<p text-center class="text-white">You have no messages yet.</p>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-list>\n        <ion-item-sliding *ngFor="let message of messages">\n            <button ion-item (click)="itemTapped(message)" [ngClass]="{\'light-bg\': !message.read}">\n                <h2 [ngClass]="{\'fw700\': !message.read}">\n                    <ion-icon name="mail" color="primary" *ngIf="!message.read"></ion-icon>\n                    <ion-icon name="mail-open" color="primary" *ngIf="message.read"></ion-icon>\n                    {{message.title}}\n                </h2>\n                <p>{{message.senderName}} ∙ {{message.date | date: \'MM/dd/yyyy\'}}</p>\n            </button>\n            <ion-item-options>\n                <button ion-button color="danger" (click)="deleteItem(message)">Delete</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/message-list/message-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_2__providers_message_service_mock__["a" /* MessageService */]])
    ], MessageListPage);
    return MessageListPage;
}());

//# sourceMappingURL=message-list.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageService = (function () {
    function MessageService(afd, storage) {
        this.afd = afd;
        this.storage = storage;
        this.messageCounter = 0;
        this.messages = this.storage.get('messages');
    }
    MessageService.prototype.findById = function (id) {
        console.log(id);
        return Promise.resolve(this.messages[id - 1]);
    };
    MessageService.prototype.message = function (message) {
        this.messageCounter = this.messageCounter + 1;
        this.messages.push({ id: this.messageCounter, message: message });
        return Promise.resolve();
    };
    MessageService.prototype.delMessage = function (message) {
        var index = this.messages.indexOf(message);
        if (index > -1) {
            this.messages.splice(index, 1);
        }
        return Promise.resolve();
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], MessageService);
    return MessageService;
}());

//# sourceMappingURL=message-service-mock.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_orders_service_mock__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrdersPage = (function () {
    function OrdersPage(navCtrl, navParams, ordersService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ordersService = ordersService;
        this.lastOrders = [];
        this.getOrders();
        // console.log(this.lastOrders);
    }
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad OrdersPage');
    // }
    OrdersPage.prototype.getOrders = function () {
        var _this = this;
        this.ordersService.getOrders()
            .then(function (data) {
            console.log(data);
            _this.lastOrders = data;
        });
    };
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-orders',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/orders/orders.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n        	<span ion-text>Orders</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="lightest-bg">\n  <ion-card *ngIf="!lastOrders.length" class="primary-bg" margin-top>\n    <ion-card-content>\n    	<p text-center class="text-white">You have no past orders.</p>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card *ngFor="let order of lastOrders">\n	  <ion-card-header text-center class="primary-bg">\n	    <p ion-text class="text-18x text-light fw300">Order number: <span ion-text class="fw700 text-white">{{ order.onumber }}</span></p>\n	  </ion-card-header>\n    <ion-card-content no-padding>\n\n		  <ion-list *ngFor="let item of order.order" no-margin>\n		  	<div ion-item>\n	        <ion-thumbnail item-left>\n	            <img src="{{item.order.picture}}"/>\n	        </ion-thumbnail>\n	          <h2 ion-text color="dark" class="fw700">{{item.order.name}}</h2>\n						<p ion-text color="primary">Quantity: <span class="fw700">{{item.qtd}}</span></p>\n						<ion-badge color="primary">{{ item.order.price * item.qtd | currency:\'USD\':true }}</ion-badge>\n				</div>\n		  </ion-list>\n\n	    <ion-grid padding>\n	      <ion-row>\n	        <ion-col>\n	          <ion-card class="green-bg full-width" no-margin text-center>\n	            <ion-card-content>\n	              <span ion-text class="text-white">Total</span>\n	              <h2 ion-text no-margin class="fw700 text-white">{{ order.total | currency:\'USD\':true }}</h2>\n	            </ion-card-content>\n	          </ion-card>\n	        </ion-col>\n	      </ion-row>\n	    </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/orders/orders.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_orders_service_mock__["a" /* OrdersService */]])
    ], OrdersPage);
    return OrdersPage;
}());

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 211:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 211;

/***/ }),

/***/ 252:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 252;

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_auth_auth__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(nav) {
        this.nav = nav;
    }
    // logout
    SettingsPage.prototype.logout = function () {
        localStorage.clear();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_auth_auth__["a" /* AuthPage */]);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/settings/settings.html"*/'<!-- -->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <span ion-text>Settings</span>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="common-bg">\n  <!-- User settings-->\n  <ion-item-group>\n    <ion-item-divider color="dark" class="bold">User Settings</ion-item-divider>\n    <ion-item>\n      <ion-label>Currency</ion-label>\n      <ion-select [(ngModel)]="currency" cancelText="Cancel" okText="OK">\n        <ion-option value="USD" selected="true">U.S Dollar (US$)</ion-option>\n        <ion-option value="EUR">Euro (€)</ion-option>\n        <ion-option value="GBP">Pound (£)</ion-option>\n        <ion-option value="BRL">Brazilian Real (R$)</ion-option>\n        <ion-option value="CNY">Chinese Yuan</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-item-group>\n  <!-- App settings-->\n  <ion-item-group>\n    <ion-item-divider color="dark" class="bold">App Settings</ion-item-divider>\n    <ion-item>\n      <span>Clear Private Data</span>\n    </ion-item>\n    <ion-item>\n      <ion-label>Push Notifications?</ion-label>\n      <ion-toggle checked="false"></ion-toggle>\n    </ion-item>\n    <ion-item>\n      <span>Privacy Policy</span>\n    </ion-item>\n  </ion-item-group>\n\n  <!--sign out button-->\n  <button ion-button color="primary" full tappable (click)="logout()">LOG OUT</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/settings/settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_orders_service_mock__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CheckoutPage = (function () {
    function CheckoutPage(nav, navParams, storage, afd, ordersService, locationCtrl, loadingCtrl, toastCtrl) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.storage = storage;
        this.afd = afd;
        this.ordersService = ordersService;
        this.locationCtrl = locationCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.paymethods = 'creditcard';
        this.totalVal = 0;
        this.orderNumber = Math.floor(Math.random() * 10000);
        this.yourLocation = "";
        this.checkoutData = this.navParams.data.orders;
        this.checkoutData.forEach(function (val, i) {
            _this.totalVal = _this.totalVal + (val.order.price * val.qtd);
        });
        this.storage.set('order-' + this.orderNumber, this.checkoutData);
    }
    // process send button
    CheckoutPage.prototype.send = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        if (sessionStorage.getItem('seatLocation') == null) {
            this.alertLocation();
        }
        else {
            var toast_1 = this.toastCtrl.create({
                showCloseButton: true,
                cssClass: 'profile-bg',
                message: 'Your order has been sent successfully! And will be delivered to ' + sessionStorage.getItem('seatLocation'),
                duration: 3000,
                position: 'bottom'
            });
            loader.present();
            setTimeout(function () {
                loader.dismiss();
                _this.ordersService.saveOrder(_this.checkoutData, _this.totalVal, _this.orderNumber)
                    .then(function (data) {
                    toast_1.present();
                    _this.storage.clear();
                });
                _this.afd.list('restaurants/' + sessionStorage.getItem('restaurant') + '/orders')
                    .update(JSON.stringify(_this.orderNumber), {
                    'orderID': _this.orderNumber,
                    'total': _this.totalVal,
                    'items': _this.navParams.data.orders
                });
                // back to home page
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }, 3000);
        }
    };
    CheckoutPage.prototype.alertLocation = function () {
        var _this = this;
        var changeLocation = this.locationCtrl.create({
            title: 'We Need Your Seat Location For Delivery',
            message: "Please type your seat and section number you want your food delivered to.",
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Done',
                    handler: function (data) {
                        console.log('Change clicked', data);
                        sessionStorage.setItem('seatLocation', data.location);
                        _this.yourLocation = data.location;
                        var toast = _this.toastCtrl.create({
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
    };
    CheckoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-checkout',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/checkout/checkout.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      <span ion-text>Checkout</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="checkout lightest-bg">\n\n  <ion-card>\n    <ion-card-content class="checkout-info" no-padding>\n\n		  <ion-list no-margin>\n        <div ion-item *ngFor="let order of checkoutData">\n        	<!-- (click)="itemTapped(favorite)" -->\n            <ion-thumbnail item-left>\n                <img src="{{order.order.picture}}"/>\n            </ion-thumbnail>\n              <h2 ion-text color="dark" class="fw700">{{order.order.name}}</h2>\n							<p ion-text color="primary">{{order.order.ingredients}}</p>\n            <div item-right>\n							<ion-badge>{{ order.order.price * order.qtd | currency:\'USD\':true }}</ion-badge>\n            </div>\n        </div>\n		  </ion-list>\n\n    <ion-grid padding>\n      <ion-row>\n        <ion-col col-8>\n\n          <ion-card class="green-bg" no-margin text-center>\n            <ion-card-content>\n              <span ion-text class="text-white">Total</span>\n              <h2 ion-text no-margin class="fw700 text-white">{{ totalVal | currency:\'USD\':true }}</h2>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n        <ion-col col-4 no-padding>\n          <span ion-text color="primary" class="text-11x">Order Number</span>\n          <br/>\n          <ion-badge color="light" class="text-primary">003454890</ion-badge>\n          <div>\n            <span ion-text color="primary" class="text-11x">Delivery Time:</span>\n            <br/>\n            <ion-badge color="light" class="text-primary">10 - 15min</ion-badge>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n  <!--payment info-->\n  <div padding>\n    <h3>Payment Methods</h3>\n\n    <ion-segment color="dark" [(ngModel)]="paymethods">\n      <ion-segment-button value="creditcard">\n        Credit card\n      </ion-segment-button>\n      <ion-segment-button value="paypal">\n        PayPal\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-card no-margin margin-vertical class="full-width">\n\n      <ion-card-content [ngSwitch]="paymethods">\n        <ion-grid *ngSwitchCase="\'creditcard\'">\n          <ion-row>\n            <ion-col no-padding text-center class="cc-flags">\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojMTU2NUMwOyIgZD0iTSA0NSAzNSBDIDQ1IDM3LjIxMDkzOCA0My4yMTA5MzggMzkgNDEgMzkgTCA3IDM5IEMgNC43ODkwNjMgMzkgMyAzNy4yMTA5MzggMyAzNSBMIDMgMTMgQyAzIDEwLjc4OTA2MyA0Ljc4OTA2MyA5IDcgOSBMIDQxIDkgQyA0My4yMTA5MzggOSA0NSAxMC43ODkwNjMgNDUgMTMgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGRkZGRjsiIGQ9Ik0gMTUuMTg3NSAxOSBMIDEyLjU1ODU5NCAyNi44MzIwMzEgQyAxMi41NTg1OTQgMjYuODMyMDMxIDExLjg5NDUzMSAyMy41MTk1MzEgMTEuODI4MTI1IDIzLjEwMTU2MyBDIDEwLjMzMjAzMSAxOS42OTE0MDYgOC4xMjUgMTkuODgyODEzIDguMTI1IDE5Ljg4MjgxMyBMIDEwLjcyNjU2MyAzMCBMIDEwLjcyNjU2MyAyOS45OTYwOTQgTCAxMy44ODY3MTkgMjkuOTk2MDk0IEwgMTguMjU3ODEzIDE5IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkZGRkY7IiBkPSJNIDE3LjY4NzUgMzAgTCAyMC41NTg1OTQgMzAgTCAyMi4yOTY4NzUgMTkgTCAxOS4zOTA2MjUgMTkgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGRkZGRjsiIGQ9Ik0gMzguMDA3ODEzIDE5IEwgMzQuOTg4MjgxIDE5IEwgMzAuMjc3MzQ0IDMwIEwgMzMuMTI4OTA2IDMwIEwgMzMuNzE4NzUgMjguNDI5Njg4IEwgMzcuMzEyNSAyOC40Mjk2ODggTCAzNy42MTcxODggMzAgTCA0MC4yMzA0NjkgMzAgWiBNIDM0LjUxMTcxOSAyNi4zMjgxMjUgTCAzNi4wNzQyMTkgMjIuMTcxODc1IEwgMzYuODk0NTMxIDI2LjMyODEyNSBaICIvPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZGRkZGOyIgZD0iTSAyNi4zNjcxODggMjIuMjA3MDMxIEMgMjYuMzY3MTg4IDIxLjYwMTU2MyAyNi44NjcxODggMjEuMTQ4NDM4IDI4LjI5Njg3NSAyMS4xNDg0MzggQyAyOS4yMjI2NTYgMjEuMTQ4NDM4IDMwLjI4NTE1NiAyMS44MjQyMTkgMzAuMjg1MTU2IDIxLjgyNDIxOSBMIDMwLjc1MzkwNiAxOS41MTU2MjUgQyAzMC43NTM5MDYgMTkuNTE1NjI1IDI5LjM5NDUzMSAxOSAyOC4wNjI1IDE5IEMgMjUuMDQyOTY5IDE5IDIzLjQ4NDM3NSAyMC40NDE0MDYgMjMuNDg0Mzc1IDIyLjI2OTUzMSBDIDIzLjQ4NDM3NSAyNS41NzgxMjUgMjcuNDY0ODQ0IDI1LjEyNSAyNy40NjQ4NDQgMjYuODIwMzEzIEMgMjcuNDY0ODQ0IDI3LjExMzI4MSAyNy4yMzQzNzUgMjcuNzg1MTU2IDI1LjU3NDIxOSAyNy43ODUxNTYgQyAyMy45MTQwNjMgMjcuNzg1MTU2IDIyLjgxNjQwNiAyNy4xNzU3ODEgMjIuODE2NDA2IDI3LjE3NTc4MSBMIDIyLjMyMDMxMyAyOS4zOTQ1MzEgQyAyMi4zMjAzMTMgMjkuMzk0NTMxIDIzLjM4NjcxOSAzMCAyNS40Mzc1IDMwIEMgMjcuNDk2MDk0IDMwIDMwLjM1NTQ2OSAyOC40NjA5MzggMzAuMzU1NDY5IDI2LjI0NjA5NCBDIDMwLjM1NTQ2OSAyMy41ODU5MzggMjYuMzY3MTg4IDIzLjM5NDUzMSAyNi4zNjcxODggMjIuMjA3MDMxIFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkMxMDc7IiBkPSJNIDEyLjIxMDkzOCAyNC45NDUzMTMgTCAxMS4yNDYwOTQgMjAuMTk1MzEzIEMgMTEuMjQ2MDk0IDIwLjE5NTMxMyAxMC44MDg1OTQgMTkuMTY3OTY5IDkuNjcxODc1IDE5LjE2Nzk2OSBDIDguNTM1MTU2IDE5LjE2Nzk2OSA1LjIzNDM3NSAxOS4xNjc5NjkgNS4yMzQzNzUgMTkuMTY3OTY5IEMgNS4yMzQzNzUgMTkuMTY3OTY5IDEwLjg5NDUzMSAyMC44Mzk4NDQgMTIuMjEwOTM4IDI0Ljk0NTMxMyBaICIvPjwvZz48L3N2Zz4=" alt="Visa" />\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojM0Y1MUI1OyIgZD0iTSA0NSAzNSBDIDQ1IDM3LjIxMDkzOCA0My4yMTA5MzggMzkgNDEgMzkgTCA3IDM5IEMgNC43ODkwNjMgMzkgMyAzNy4yMTA5MzggMyAzNSBMIDMgMTMgQyAzIDEwLjc4OTA2MyA0Ljc4OTA2MyA5IDcgOSBMIDQxIDkgQyA0My4yMTA5MzggOSA0NSAxMC43ODkwNjMgNDUgMTMgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGQzEwNzsiIGQ9Ik0gNDAgMjQgQyA0MCAyOS41MjM0MzggMzUuNTIzNDM4IDM0IDMwIDM0IEMgMjQuNDc2NTYzIDM0IDIwIDI5LjUyMzQzOCAyMCAyNCBDIDIwIDE4LjQ3NjU2MyAyNC40NzY1NjMgMTQgMzAgMTQgQyAzNS41MjM0MzggMTQgNDAgMTguNDc2NTYzIDQwIDI0IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiNGRjNEMDA7IiBkPSJNIDIyLjAxNTYyNSAzMCBDIDIxLjU1MDc4MSAyOS4zODI4MTMgMjEuMTUyMzQ0IDI4LjcxNDg0NCAyMC44Mzk4NDQgMjggTCAyNi4xNjQwNjMgMjggQyAyNi40NDE0MDYgMjcuMzYzMjgxIDI2LjY2MDE1NiAyNi42OTUzMTMgMjYuODAwNzgxIDI2IEwgMjAuMjAzMTI1IDI2IEMgMjAuMDcwMzEzIDI1LjM1NTQ2OSAyMCAyNC42ODc1IDIwIDI0IEwgMjcgMjQgQyAyNyAyMy4zMTI1IDI2LjkyOTY4OCAyMi42NDQ1MzEgMjYuODAwNzgxIDIyIEwgMjAuMTk5MjE5IDIyIEMgMjAuMzQzNzUgMjEuMzA0Njg4IDIwLjU1ODU5NCAyMC42MzY3MTkgMjAuODM5ODQ0IDIwIEwgMjYuMTY0MDYzIDIwIEMgMjUuODUxNTYzIDE5LjI4NTE1NiAyNS40NTMxMjUgMTguNjE3MTg4IDI0Ljk4ODI4MSAxOCBMIDIyLjAxNTYyNSAxOCBDIDIyLjQ0OTIxOSAxNy40MjE4NzUgMjIuOTQ1MzEzIDE2Ljg3ODkwNiAyMy40OTYwOTQgMTYuNDA2MjUgQyAyMS43NDYwOTQgMTQuOTEwMTU2IDE5LjQ4MDQ2OSAxNCAxNyAxNCBDIDExLjQ3NjU2MyAxNCA3IDE4LjQ3NjU2MyA3IDI0IEMgNyAyOS41MjM0MzggMTEuNDc2NTYzIDM0IDE3IDM0IEMgMjAuMjY5NTMxIDM0IDIzLjE2MDE1NiAzMi40MjU3ODEgMjQuOTg0Mzc1IDMwIFogIi8+PC9nPjwvc3ZnPg==" alt="mastercard">\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojRTFFN0VBOyIgZD0iTSA0NSAzNSBDIDQ1IDM3LjE5OTIxOSA0My4xOTkyMTkgMzkgNDEgMzkgTCA3IDM5IEMgNC44MDA3ODEgMzkgMyAzNy4xOTkyMTkgMyAzNSBMIDMgMTMgQyAzIDEwLjgwMDc4MSA0LjgwMDc4MSA5IDcgOSBMIDQxIDkgQyA0My4xOTkyMTkgOSA0NSAxMC44MDA3ODEgNDUgMTMgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGNkQwMDsiIGQ9Ik0gNDUgMzUgQyA0NSAzNy4xOTkyMTkgNDMuMTk5MjE5IDM5IDQxIDM5IEwgMTYgMzkgQyAxNiAzOSAzOS42MDE1NjMgMzUuMTk5MjE5IDQ1IDI0IFogTSAyMiAyNCBDIDIyIDI1LjY5OTIxOSAyMy4zMDA3ODEgMjcgMjUgMjcgQyAyNi42OTkyMTkgMjcgMjggMjUuNjk5MjE5IDI4IDI0IEMgMjggMjIuMzAwNzgxIDI2LjY5OTIxOSAyMSAyNSAyMSBDIDIzLjMwMDc4MSAyMSAyMiAyMi4zMDA3ODEgMjIgMjQgWiAiLz48cGF0aCBzdHlsZT0iICIgZD0iTSAxMS4xOTkyMTkgMjEgTCAxMi4zMDA3ODEgMjEgTCAxMi4zMDA3ODEgMjcgTCAxMS4xOTkyMTkgMjcgWiBNIDE3LjE5OTIxOSAyNCBDIDE3LjE5OTIxOSAyNS42OTkyMTkgMTguNSAyNyAyMC4xOTkyMTkgMjcgQyAyMC42OTkyMTkgMjcgMjEuMTAxNTYzIDI2Ljg5ODQzOCAyMS42MDE1NjMgMjYuNjk5MjE5IEwgMjEuNjAxNTYzIDI1LjM5ODQzOCBDIDIxLjE5OTIxOSAyNS44MDA3ODEgMjAuODAwNzgxIDI2IDIwLjE5OTIxOSAyNiBDIDE5LjEwMTU2MyAyNiAxOC4zMDA3ODEgMjUuMTk5MjE5IDE4LjMwMDc4MSAyNCBDIDE4LjMwMDc4MSAyMi44OTg0MzggMTkuMTAxNTYzIDIyIDIwLjE5OTIxOSAyMiBDIDIwLjY5OTIxOSAyMiAyMS4xMDE1NjMgMjIuMTk5MjE5IDIxLjYwMTU2MyAyMi42MDE1NjMgTCAyMS42MDE1NjMgMjEuMzAwNzgxIEMgMjEuMTAxNTYzIDIxLjEwMTU2MyAyMC42OTkyMTkgMjAuODk4NDM4IDIwLjE5OTIxOSAyMC44OTg0MzggQyAxOC41IDIxIDE3LjE5OTIxOSAyMi4zOTg0MzggMTcuMTk5MjE5IDI0IFogTSAzMC42MDE1NjMgMjQuODk4NDM4IEwgMjkgMjEgTCAyNy44MDA3ODEgMjEgTCAzMC4zMDA3ODEgMjcgTCAzMC44OTg0MzggMjcgTCAzMy4zOTg0MzggMjEgTCAzMi4xOTkyMTkgMjEgWiBNIDMzLjg5ODQzOCAyNyBMIDM3LjEwMTU2MyAyNyBMIDM3LjEwMTU2MyAyNiBMIDM1IDI2IEwgMzUgMjQuMzk4NDM4IEwgMzcgMjQuMzk4NDM4IEwgMzcgMjMuMzk4NDM4IEwgMzUgMjMuMzk4NDM4IEwgMzUgMjIgTCAzNy4xMDE1NjMgMjIgTCAzNy4xMDE1NjMgMjEgTCAzMy44OTg0MzggMjEgWiBNIDQxLjUgMjIuODAwNzgxIEMgNDEuNSAyMS42OTkyMTkgNDAuODAwNzgxIDIxIDM5LjUgMjEgTCAzNy44MDA3ODEgMjEgTCAzNy44MDA3ODEgMjcgTCAzOC44OTg0MzggMjcgTCAzOC44OTg0MzggMjQuNjAxNTYzIEwgMzkgMjQuNjAxNTYzIEwgNDAuNjAxNTYzIDI3IEwgNDIgMjcgTCA0MC4xOTkyMTkgMjQuNSBDIDQxIDI0LjMwMDc4MSA0MS41IDIzLjY5OTIxOSA0MS41IDIyLjgwMDc4MSBaIE0gMzkuMTk5MjE5IDIzLjgwMDc4MSBMIDM4Ljg5ODQzOCAyMy44MDA3ODEgTCAzOC44OTg0MzggMjIgTCAzOS4xOTkyMTkgMjIgQyAzOS44OTg0MzggMjIgNDAuMzAwNzgxIDIyLjMwMDc4MSA0MC4zMDA3ODEgMjIuODk4NDM4IEMgNDAuMzAwNzgxIDIzLjM5ODQzOCA0MCAyMy44MDA3ODEgMzkuMTk5MjE5IDIzLjgwMDc4MSBaIE0gNy42OTkyMTkgMjEgTCA2IDIxIEwgNiAyNyBMIDcuNjAxNTYzIDI3IEMgMTAuMTAxNTYzIDI3IDEwLjY5OTIxOSAyNC44OTg0MzggMTAuNjk5MjE5IDI0IEMgMTAuODAwNzgxIDIyLjE5OTIxOSA5LjUgMjEgNy42OTkyMTkgMjEgWiBNIDcuMzk4NDM4IDI2IEwgNy4xMDE1NjMgMjYgTCA3LjEwMTU2MyAyMiBMIDcuNSAyMiBDIDkgMjIgOS42MDE1NjMgMjMgOS42MDE1NjMgMjQgQyA5LjYwMTU2MyAyNC4zOTg0MzggOS41IDI2IDcuMzk4NDM4IDI2IFogTSAxNS4zMDA3ODEgMjMuMzAwNzgxIEMgMTQuNjAxNTYzIDIzIDE0LjM5ODQzOCAyMi44OTg0MzggMTQuMzk4NDM4IDIyLjYwMTU2MyBDIDE0LjM5ODQzOCAyMi4xOTkyMTkgMTQuODAwNzgxIDIyIDE1LjE5OTIxOSAyMiBDIDE1LjUgMjIgMTUuODAwNzgxIDIyLjEwMTU2MyAxNi4xMDE1NjMgMjIuNSBMIDE2LjY5OTIxOSAyMS42OTkyMTkgQyAxNi4xOTkyMTkgMjEuMTk5MjE5IDE1LjY5OTIxOSAyMSAxNSAyMSBDIDE0IDIxIDEzLjE5OTIxOSAyMS42OTkyMTkgMTMuMTk5MjE5IDIyLjY5OTIxOSBDIDEzLjE5OTIxOSAyMy41IDEzLjYwMTU2MyAyMy44OTg0MzggMTQuNjAxNTYzIDI0LjMwMDc4MSBDIDE1LjE5OTIxOSAyNC41IDE1LjY5OTIxOSAyNC42OTkyMTkgMTUuNjk5MjE5IDI1LjE5OTIxOSBDIDE1LjY5OTIxOSAyNS42OTkyMTkgMTUuMzAwNzgxIDI2IDE0LjgwMDc4MSAyNiBDIDE0LjMwMDc4MSAyNiAxMy44MDA3ODEgMjUuNjk5MjE5IDEzLjYwMTU2MyAyNS4xOTkyMTkgTCAxMi44OTg0MzggMjUuODk4NDM4IEMgMTMuMzk4NDM4IDI2LjY5OTIxOSAxNCAyNyAxNC44OTg0MzggMjcgQyAxNi4xMDE1NjMgMjcgMTYuODk4NDM4IDI2LjE5OTIxOSAxNi44OTg0MzggMjUuMTAxNTYzIEMgMTYuODk4NDM4IDI0LjE5OTIxOSAxNi41IDIzLjgwMDc4MSAxNS4zMDA3ODEgMjMuMzAwNzgxIFogIi8+PC9nPjwvc3ZnPg==" alt="discover">\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNTIgMjUyIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwyNTJ2LTI1MmgyNTJ2MjUyeiIgZmlsbD0ibm9uZSIvPjxnPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggZD0iTTIzNi4yNSwxODMuNzVjMCwxMS42MDc0MiAtOS4zOTI1OCwyMSAtMjEsMjFoLTE3OC41Yy0xMS42MDc0MiwwIC0yMSwtOS4zOTI1OCAtMjEsLTIxdi0xMTUuNWMwLC0xMS42MDc0MiA5LjM5MjU4LC0yMSAyMSwtMjFoMTc4LjVjMTEuNjA3NDIsMCAyMSw5LjM5MjU4IDIxLDIxeiIgZmlsbD0iIzE2YTA4NSIvPjxwYXRoIGQ9Ik0xMTYuODMzMDEsMTA1bC0xMS4wOTQ3MywyNC41ODg4N2wtMTEuMDMzMiwtMjQuNTg4ODdoLTE0LjE1MDM5djM1LjMxNDQ2bC0xNS43NzA1MSwtMzUuMzE0NDZoLTExLjkzNTU1bC0xNi4wOTg2MywzNi42NDc0Nmg5LjUzNjEzbDMuNTA2ODQsLTguMTgyNjJoMTguMDI2MzdsMy41ODg4Nyw4LjE4MjYyaDE4LjE5MDQzdi0yNy4yMTM4N2wxMi4wNTg1OSwyNy4yMTM4N2g4LjIwMzEzbDEyLjM0NTcxLC0yNi43NDIxOXYyNi43NDIxOWg5LjA0Mzk0di0zNi42NDc0NnpNNTMuMjE3NzcsMTI1LjU0ODgzbDUuMzczMDQsLTEyLjc5Njg3bDUuNTk4NjQsMTIuNzk2ODh6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTE5OC44ODQ3NywxMjIuOTIzODNsMTYuMzY1MjMsLTE3LjgyMTI5aC0xMS42NDg0NGwtMTAuNDU4OTgsMTEuMzYxMzNsLTEwLjEzMDg2LC0xMS40NjM4N2gtMzYuMDExNzJ2MzYuNjQ3NDZoMzQuODQyNzdsMTAuOTcxNjgsLTEyLjEyMDEybDEwLjcwNTA4LDEyLjIyMjY2aDExLjYwNzQyek0xNzcuMDY0NDYsMTMzLjk1NzAzaC0yMS4wNDEwMnYtNy4yMzkyNmgyMC4xMzg2N3YtNi45NTIxNWgtMjAuMTM4Njd2LTYuODcwMTJsMjIuMjA5OTYsMC4wNjE1Mmw4LjkwMDM5LDkuOTY2OHoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvZz48L3N2Zz4=" alt="Amex">\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input type="text" placeholder="Card Holder"></ion-input>\n  <!--               <ion-icon name="person" item-end no-margin></ion-icon> -->\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input placeholder="Card Number" type="number"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-4>\n              <ion-item no-padding>\n                <ion-select placeholder="MM" class="max-width full-width">\n                  <ion-option value="01">01</ion-option>\n                  <ion-option value="02">02</ion-option>\n                  <ion-option value="03">03</ion-option>\n                  <ion-option value="04">04</ion-option>\n                  <ion-option value="05">05</ion-option>\n                  <ion-option value="06">06</ion-option>\n                  <ion-option value="07">07</ion-option>\n                  <ion-option value="08">08</ion-option>\n                  <ion-option value="09">09</ion-option>\n                  <ion-option value="10">10</ion-option>\n                  <ion-option value="11">11</ion-option>\n                  <ion-option value="12">12</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n            <ion-col col-4>\n              <ion-item no-padding>\n                <ion-select placeholder="YY" class="max-width full-width">\n                  <ion-option value="19">19</ion-option>\n                  <ion-option value="20">20</ion-option>\n                  <ion-option value="21">21</ion-option>\n                  <ion-option value="22">22</ion-option>\n                  <ion-option value="23">23</ion-option>\n                  <ion-option value="24">24</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n            <ion-col col-4>\n              <ion-item no-padding>\n                <ion-input placeholder="CVV" type="number"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n\n        <ion-grid *ngSwitchCase="\'paypal\'" padding>\n          <ion-row>\n            <ion-col no-padding text-center class="cc-flags">\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojMTU2NUMwOyIgZD0iTSAxOC42OTkyMTkgMTMuNzY1NjI1IEwgMTguNzAzMTI1IDEzLjc2OTUzMSBDIDE4LjgwODU5NCAxMy4zMjQyMTkgMTkuMTg3NSAxMyAxOS42NjAxNTYgMTMgTCAzMy4xMzI4MTMgMTMgQyAzMy4xNDg0MzggMTMgMzMuMTY0MDYzIDEyLjk5MjE4OCAzMy4xODM1OTQgMTIuOTkyMTg4IEMgMzIuODk0NTMxIDguMjE0ODQ0IDI4Ljg4NjcxOSA2IDI1LjM1MTU2MyA2IEwgMTEuODc4OTA2IDYgQyAxMS40MDIzNDQgNiAxMS4wMjczNDQgNi4zMzU5MzggMTAuOTIxODc1IDYuNzc3MzQ0IEwgMTAuOTE3OTY5IDYuNzczNDM4IEwgNS4wMjczNDQgMzMuODEyNSBMIDUuMDQyOTY5IDMzLjgxMjUgQyA1LjAyNzM0NCAzMy44Nzg5MDYgNS4wMDM5MDYgMzMuOTM3NSA1LjAwMzkwNiAzNC4wMDc4MTMgQyA1LjAwMzkwNiAzNC41NjI1IDUuNDQ5MjE5IDM1IDYuMDAzOTA2IDM1IEwgMTQuMDc0MjE5IDM1IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiMwMzlCRTU7IiBkPSJNIDMzLjE4MzU5NCAxMi45OTIxODggQyAzMy4yMzQzNzUgMTMuODcxMDk0IDMzLjE3OTY4OCAxNC44MjQyMTkgMzIuOTUzMTI1IDE1Ljg3NSBDIDMxLjY3MTg3NSAyMS44NzEwOTQgMjcuMDQyOTY5IDI0Ljk5MjE4OCAyMS4zMjAzMTMgMjQuOTkyMTg4IEMgMjEuMzIwMzEzIDI0Ljk5MjE4OCAxNy44NDc2NTYgMjQuOTkyMTg4IDE3LjAwNzgxMyAyNC45OTIxODggQyAxNi40ODQzNzUgMjQuOTkyMTg4IDE2LjIzODI4MSAyNS4yOTY4NzUgMTYuMTI1IDI1LjUzMTI1IEwgMTQuMzg2NzE5IDMzLjU3ODEyNSBMIDE0LjA4MjAzMSAzNS4wMDc4MTMgTCAxNC4wNzQyMTkgMzUuMDA3ODEzIEwgMTIuODEyNSA0MC44MDQ2ODggTCAxMi44MjQyMTkgNDAuODA0Njg4IEMgMTIuODEyNSA0MC44NzEwOTQgMTIuNzg1MTU2IDQwLjkyOTY4OCAxMi43ODUxNTYgNDEgQyAxMi43ODUxNTYgNDEuNTU0Njg4IDEzLjIzNDM3NSA0MiAxMy43ODUxNTYgNDIgTCAyMS4xMTcxODggNDIgTCAyMS4xMzI4MTMgNDEuOTg4MjgxIEMgMjEuNjA1NDY5IDQxLjk4NDM3NSAyMS45ODA0NjkgNDEuNjQ0NTMxIDIyLjA3ODEyNSA0MS4yMDMxMjUgTCAyMi4wOTM3NSA0MS4xODc1IEwgMjMuOTA2MjUgMzIuNzY5NTMxIEMgMjMuOTA2MjUgMzIuNzY5NTMxIDI0LjAzMTI1IDMxLjk2ODc1IDI0Ljg3ODkwNiAzMS45Njg3NSBDIDI1LjcyMjY1NiAzMS45Njg3NSAyOS4wNTQ2ODggMzEuOTY4NzUgMjkuMDU0Njg4IDMxLjk2ODc1IEMgMzQuNzc3MzQ0IDMxLjk2ODc1IDM5LjQ1NzAzMSAyOC44NjMyODEgNDAuNzM4MjgxIDIyLjg2NzE4OCBDIDQyLjE3OTY4OCAxNi4xMDU0NjkgMzcuMzU5Mzc1IDEzLjAxOTUzMSAzMy4xODM1OTQgMTIuOTkyMTg4IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiMyODM1OTM7IiBkPSJNIDE5LjY2MDE1NiAxMyBDIDE5LjE4NzUgMTMgMTguODA4NTk0IDEzLjMyNDIxOSAxOC43MDMxMjUgMTMuNzY5NTMxIEwgMTguNjk5MjE5IDEzLjc2NTYyNSBMIDE2LjEyNSAyNS41MzEyNSBDIDE2LjIzODI4MSAyNS4yOTY4NzUgMTYuNDg0Mzc1IDI0Ljk5MjE4OCAxNy4wMDM5MDYgMjQuOTkyMTg4IEMgMTcuODQ3NjU2IDI0Ljk5MjE4OCAyMS4yMzgyODEgMjQuOTkyMTg4IDIxLjIzODI4MSAyNC45OTIxODggQyAyNi45NjQ4NDQgMjQuOTkyMTg4IDMxLjY3MTg3NSAyMS44NzEwOTQgMzIuOTUzMTI1IDE1Ljg3ODkwNiBDIDMzLjE3OTY4OCAxNC44MjQyMTkgMzMuMjM0Mzc1IDEzLjg3MTA5NCAzMy4xODM1OTQgMTIuOTk2MDk0IEMgMzMuMTY0MDYzIDEyLjk5MjE4OCAzMy4xNDg0MzggMTMgMzMuMTMyODEzIDEzIFogIi8+PC9nPjwvc3ZnPg==" alt="paypal">\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input type="mail" placeholder="E-mail"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input placeholder="Password" type="password"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n\n    </ion-card>\n\n    <!--submit button-->\n    <button ion-button color="secondary" margin-top icon-right full tappable (click)="send()">\n    	Confirm\n    	<ion-icon name="cash"></ion-icon>\n    </button>\n\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/checkout/checkout.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["AngularFireDatabase"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["AngularFireDatabase"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__providers_orders_service_mock__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_orders_service_mock__["a" /* OrdersService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]) === "function" && _h || Object])
    ], CheckoutPage);
    return CheckoutPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_list_message_list__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationsPage = (function () {
    function NotificationsPage(navCtrl, afd, storage, viewCtrl) {
        this.navCtrl = navCtrl;
        this.afd = afd;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.messages = [];
    }
    NotificationsPage.prototype.ionViewWillLoad = function () {
        this.getMessages();
    };
    NotificationsPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    NotificationsPage.prototype.goToMessages = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__message_list_message_list__["a" /* MessageListPage */]);
    };
    NotificationsPage.prototype.getMessages = function () {
        var _this = this;
        this.afd.list('/users/' + localStorage.getItem('userID') + '/messages/')
            .valueChanges().subscribe(function (data) {
            _this.messages = data;
            console.log('messages: ' + _this.messages);
        }, function (err) {
            console.log("problem : ", err);
        });
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/notifications/notifications.html"*/'<ion-list>\n  <ion-item-sliding *ngFor="let message of messages">\n      <button ion-item (click)="goToMessages()" [ngClass]="{\'light-bg\': !message.read}">\n          <h2 [ngClass]="{\'fw300\': !message.read}">\n              <ion-icon name="mail" color="primary" *ngIf="!message.read"></ion-icon>\n              <ion-icon name="mail-open" color="primary" *ngIf="message.read"></ion-icon>\n              {{message.title}}\n          </h2>\n          <p color="primary">{{message.senderName}} ∙ {{message.date | date: \'MM/dd/yyyy\'}}</p>\n      </button>\n  </ion-item-sliding>\n</ion-list>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/notifications/notifications.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_message_service_mock__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessageDetailPage = (function () {
    function MessageDetailPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.message = this.navParams.data;
    }
    MessageDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-message-detail',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/message-detail/message-detail.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n            <span ion-text>Message</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <div class="message-header profiles-bg" padding>\n        <h5 ion-text color="light" class="fw700">{{message.title}}</h5>\n        <p ion-text no-margin color="light">{{message.date | date: \'MM/dd/yyyy\'}} ∙ by {{message.senderName}}</p>\n    </div>\n\n    <div padding-horizontal>\n\n        <p>\n            {{message.message}}\n        </p>\n\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/message-detail/message-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_message_service_mock__["a" /* MessageService */]])
    ], MessageDetailPage);
    return MessageDetailPage;
}());

//# sourceMappingURL=message-detail.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NearbyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_restaurant_service_mock__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__restaurant_filter_restaurant_filter__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__restaurant_detail_restaurant_detail__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NearbyPage = (function () {
    function NearbyPage(navCtrl, service, modalCtrl) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.findAll();
    }
    NearbyPage.prototype.openRestaurantFilterPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__restaurant_filter_restaurant_filter__["a" /* RestaurantFilterPage */]);
        // modal.onDidDismiss(data => {
        //   console.log(data);
        // });
        modal.present();
    };
    NearbyPage.prototype.openRestaurantDetail = function (restaurant) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__restaurant_detail_restaurant_detail__["a" /* RestaurantDetailPage */], restaurant);
    };
    NearbyPage.prototype.findAll = function () {
        var _this = this;
        this.service.findAll()
            .then(function (data) { return _this.restaurants = data; })
            .catch(function (error) { return alert(error); });
    };
    NearbyPage.prototype.showMarkers = function () {
        var _this = this;
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.layerGroup([]);
        this.restaurants.forEach(function (restaurant) {
            if (restaurant.lat, restaurant.long) {
                var marker = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.marker([restaurant.lat, restaurant.long])
                    .on('click', function (event) { return _this.openRestaurantDetail(restaurant); });
                marker.data = restaurant;
                _this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    };
    NearbyPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.map = __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.map("nearby-map").setView([32.7478761, -97.0945991], 18);
            __WEBPACK_IMPORTED_MODULE_5_leaflet___default.a.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(_this.map);
            _this.showMarkers();
        });
    };
    NearbyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-nearby',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/nearby/nearby.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <span ion-text>Nearby</span>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="lightest-bg">\n\n<!-- <div padding *ngIf="from !== \'home\'">\n  <ion-segment [(ngModel)]="proptype">\n    <ion-segment-button value="">\n      All\n    </ion-segment-button>\n    <ion-segment-button value="sale">\n      For Sale\n    </ion-segment-button>\n    <ion-segment-button value="rent">\n      For Rent\n    </ion-segment-button>\n  </ion-segment>\n</div> -->\n\n  <div style="width:100%;height:100%;" id="nearby-map"></div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/nearby/nearby.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_restaurant_service_mock__["a" /* RestaurantService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], NearbyPage);
    return NearbyPage;
}());

//# sourceMappingURL=nearby.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_category_service_mock__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__restaurant_list_restaurant_list__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CategoryPage = (function () {
    function CategoryPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.findAll();
    }
    CategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryPage');
    };
    CategoryPage.prototype.findAll = function () {
        var _this = this;
        this.service.findAll()
            .then(function (data) { return _this.categories = data; })
            .catch(function (error) { return alert(error); });
    };
    CategoryPage.prototype.openRestaurantListPage = function (proptype) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__restaurant_list_restaurant_list__["a" /* RestaurantListPage */], { 'proptype': proptype });
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/category/category.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Category</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<div class="card-background-page">\n\n	  <ion-card *ngFor="let category of categories" tappable (click)="openRestaurantListPage(category.name)">\n	    <img [src]="category.picture" />\n	    <div class="card-title">{{category.name}}</div>\n	    <div class="card-subtitle">{{category.quantity}} Restaurants</div>\n	  </ion-card>\n\n	</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/category/category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_category_service_mock__["a" /* CategoryService */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_categories__ = __webpack_require__(522);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CategoryService = (function () {
    function CategoryService() {
    }
    CategoryService.prototype.findAll = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_categories__["a" /* default */]);
    };
    CategoryService.prototype.findById = function (id) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_categories__["a" /* default */][id - 1]);
    };
    CategoryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CategoryService);
    return CategoryService;
}());

//# sourceMappingURL=category-service-mock.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalkthroughPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WalkthroughPage = (function () {
    function WalkthroughPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.showSkip = true;
        this.dir = 'ltr';
        this.slideList = [
            {
                title: "What is Stan<strong>deliver</strong>?",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
                image: "assets/img/foodIonic-ico.png",
            },
            {
                title: "Why is it awesome?",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
                image: "assets/img/foodIonic-ico.png",
            },
            {
                title: "Your food is on the way!",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
                image: "assets/img/foodIonic-ico.png",
            }
        ];
    }
    WalkthroughPage.prototype.onSlideNext = function () {
        this.slides.slideNext(300);
    };
    WalkthroughPage.prototype.onSlidePrev = function () {
        this.slides.slidePrev(300);
    };
    WalkthroughPage.prototype.onLastSlide = function () {
        this.slides.slideTo(3, 300);
    };
    WalkthroughPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    WalkthroughPage.prototype.openAuthPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* AuthPage */]);
    };
    WalkthroughPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalkthroughPage');
    };
    WalkthroughPage.prototype.ionViewWillEnter = function () {
        if (localStorage.getItem('loggedIn') == 'true') {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], WalkthroughPage.prototype, "slides", void 0);
    WalkthroughPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-walkthrough',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/walkthrough/walkthrough.html"*/'<ion-content class="primary-bg">\n  <ion-slides pager="true" dir="{{dir}}">\n    <ion-slide *ngFor="let slide of slideList">\n      <ion-toolbar>\n        <ion-buttons end>\n          <button ion-button color="light" (click)="onLastSlide()"><strong>Skip</strong></button>\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="slide.image" class="slide-image">\n      <h2 class="slide-title text-white" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description" class="text-white"></p>\n\n			<div padding>\n	      <button ion-button round block color="secondary" margin-top icon-end (click)="onSlideNext()">\n	      	Next\n	      	<ion-icon name="arrow-round-forward" color="light"></ion-icon>\n	    	</button>\n    	</div>\n    </ion-slide>\n    <ion-slide>\n      <ion-toolbar>\n      </ion-toolbar>\n      <img src="assets/img/foodIonic-ico.png" class="slide-image" margin-top>\n      <h2 class="slide-title text-white" margin-bottom>Ready to Order?</h2>\n\n      <div padding>\n        <button ion-button block round color="secondary" margin-top (click)="openAuthPage()">\n          Sign In / Sign Up\n        </button>\n        <button ion-button block round color="dark" margin-top (click)="openHomePage()">\n          Get Started\n        </button>\n      </div>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/walkthrough/walkthrough.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], WalkthroughPage);
    return WalkthroughPage;
}());

//# sourceMappingURL=walkthrough.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyAccountPage = (function () {
    function MyAccountPage(navCtrl, loadingCtrl, afd, afAuth, storage, toastCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.afd = afd;
        this.afAuth = afAuth;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.profiledata = true;
        this.userData;
        this.email;
        this.username;
        this.status;
        this.getUserData();
    }
    // process send button
    MyAccountPage.prototype.sendData = function () {
        var _this = this;
        // send booking info
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        // show message
        var toast = this.toastCtrl.create({
            showCloseButton: true,
            cssClass: 'profiles-bg',
            message: 'Your Data was Edited!',
            duration: 3000,
            position: 'bottom'
        });
        loader.present();
        setTimeout(function () {
            loader.dismiss();
            toast.present();
            // back to home page
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        }, 3000);
    };
    MyAccountPage.prototype.getUserData = function () {
        var _this = this;
        this.afd.object('/users/' + localStorage.getItem('userID'))
            .valueChanges().subscribe(function (data) {
            _this.userData = data;
            _this.email = _this.userData.email;
            _this.username = _this.userData.name;
            _this.status = _this.userData.status;
            console.log(_this.userData);
        }, function (err) {
            console.log("problem : ", err);
        });
    };
    MyAccountPage.prototype.logout = function () {
        localStorage.clear();
        this.storage.clear();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_auth_auth__["a" /* AuthPage */]);
    };
    MyAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-account',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/my-account/my-account.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n            <span ion-text>My Account</span>\n				</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="profile light-bg">\n\n    <ion-card>\n      <ion-card-content class="profiles-bg">\n          <h2 class="fw500">{{email}}</h2>\n          <h3 ion-text color="light">Status: {{status}}</h3>\n          <!-- <button ion-button icon-start block outline margin-top color="light">\n            <ion-icon name="photos"></ion-icon>\n            Edit / Insert Avatar\n          </button> -->\n      </ion-card-content>\n\n			<div padding>\n	      <ion-list>\n\n	        <ion-item>\n	          <ion-label color="dark" stacked>Name:</ion-label>\n	          <ion-input type="text" placeholder="Ex..: Joe Doe" value="{{username}}"></ion-input>\n	        </ion-item>\n\n	        <ion-item>\n	          <ion-label color="dark" stacked>Email:</ion-label>\n	          <ion-input type="email" placeholder="Ex.: joe@doe.com" value="{{email}}"></ion-input>\n	        </ion-item>\n\n	        <!-- <ion-item>\n	          <ion-label color="dark" stacked>Address:</ion-label>\n	          <ion-input type="text" placeholder="Ex.: Abey Road 5"></ion-input>\n	        </ion-item> -->\n\n				  <!-- <ion-item>\n				    <ion-label color="dark">City</ion-label>\n				    <ion-select>\n				      <ion-option value="nes">New York</ion-option>\n				      <ion-option value="n64">Los Angeles</ion-option>\n				      <ion-option value="ps">London</ion-option>\n				      <ion-option value="genesis">Paris</ion-option>\n				      <ion-option value="saturn">São Paulo</ion-option>\n				      <ion-option value="snes">Tokyo</ion-option>\n				      <ion-option value="snes">New Delhi</ion-option>\n				    </ion-select>\n				  </ion-item> -->\n\n				  <!-- <ion-item>\n				    <ion-label color="dark">State</ion-label>\n				    <ion-select>\n				      <ion-option value="nes">NY</ion-option>\n				      <ion-option value="n64">CA</ion-option>\n				      <ion-option value="ps">Greater London</ion-option>\n				      <ion-option value="genesis">Paris</ion-option>\n				      <ion-option value="saturn">SP</ion-option>\n				      <ion-option value="snes">Kantō</ion-option>\n				      <ion-option value="snes">Delhi</ion-option>\n				    </ion-select>\n				  </ion-item> -->\n\n					<!-- <ion-list radio-group margin-top margin-bottom>\n					  <ion-list-header no-margin no-padding>\n					    <span ion-text color="dark" class="fw500">User Type</span>\n					  </ion-list-header> -->\n\n					  <!-- <ion-item>\n					    <ion-label color="dark">Customer</ion-label>\n					    <ion-radio checked="true" value="customer"></ion-radio>\n					  </ion-item> -->\n\n					  <!-- <ion-item>\n					    <ion-label color="dark">Restaurant Owner</ion-label>\n					    <ion-radio value="owner"></ion-radio>\n					  </ion-item> -->\n\n					  <!-- <ion-item>\n					    <ion-label color="dark">Chef</ion-label>\n					    <ion-radio value="chef"></ion-radio>\n					  </ion-item>\n					</ion-list> -->\n\n          <!-- <ion-item>\n          	<ion-label>Available to receive promo or app messages?</ion-label>\n          <ion-checkbox></ion-checkbox>\n        </ion-item> -->\n	      </ion-list>\n			</div>\n\n			<div padding>\n				<button ion-button large full color="dark" (click)="sendData()">Update</button>\n				<p style="text-align:center;padding:10px" color="dark" no-margin (click)="logout()">\n						<ion-icon name="log-out"></ion-icon><strong style="margin-left:10px;">LOG OUT</strong>\n				</p>\n			</div>\n    </ion-card>\n\n    <div padding>\n      \n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/my-account/my-account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], MyAccountPage);
    return MyAccountPage;
}());

//# sourceMappingURL=my-account.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoriteListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_restaurant_service_mock__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__restaurant_detail_restaurant_detail__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FavoriteListPage = (function () {
    function FavoriteListPage(navCtrl, service) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.favorites = [];
        this.getFavorites();
        console.log(this.favorites);
    }
    FavoriteListPage.prototype.itemTapped = function (favorite) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__restaurant_detail_restaurant_detail__["a" /* RestaurantDetailPage */], favorite.restaurant);
    };
    FavoriteListPage.prototype.deleteItem = function (favorite) {
        var _this = this;
        this.service.unfavorite(favorite)
            .then(function () {
            _this.getFavorites();
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    FavoriteListPage.prototype.getFavorites = function () {
        var _this = this;
        this.service.getFavorites()
            .then(function (data) { return _this.favorites = data; });
    };
    FavoriteListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-favorite-list',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/favorite-list/favorite-list.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n        	<span ion-text>Favorite Restaurants</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="lightest-bg">\n    <ion-card *ngIf="!favorites.length" class="primary-bg" margin-top>\n      <ion-card-content>\n      	<p text-center class="text-white">You have no favorite restaurants.</p>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-list>\n        <ion-item-sliding *ngFor="let favorite of favorites">\n            <button ion-item (click)="itemTapped(favorite)">\n                <ion-thumbnail item-left>\n                    <img src="{{favorite.restaurant.thumbnail}}"/>\n                </ion-thumbnail>\n                <h2>{{favorite.restaurant.title}}</h2>\n                <p>{{favorite.restaurant.city}}, {{favorite.restaurant.state}} ∙ {{favorite.restaurant.price}}</p>\n            </button>\n            <ion-item-options>\n                <button ion-button color="danger" (click)="deleteItem(favorite)">Delete</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/favorite-list/favorite-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_restaurant_service_mock__["a" /* RestaurantService */]])
    ], FavoriteListPage);
    return FavoriteListPage;
}());

//# sourceMappingURL=favorite-list.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/about/about.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n            <span ion-text>About</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <div class="about-header profiles-bg" padding>\n        <img src="assets/img/foodIonic-ico220.png">\n    </div>\n\n    <div padding class="about-info">\n\n        <h4 ion-text color="dark">Stan<strong>deliver</strong> Application</h4>\n\n        <p>\n            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio placeat incidunt nesciunt atque ratione quisquam, fugit omnis maxime adipisci excepturi dignissimos aliquam asperiores itaque unde sequi? Minus, quia, dolore?\n        </p>\n\n        <p>\n            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio placeat incidunt nesciunt atque ratione quisquam, fugit omnis maxime adipisci excepturi dignissimos aliquam asperiores itaque unde sequi? Minus, quia, dolore?\n        </p>\n\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SupportPage = (function () {
    function SupportPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SupportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-support',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/support/support.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n            <span ion-text>Support</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="lightest-bg">\n\n    <div class="support-header">\n        <img src="assets/img/support-app.jpg">\n    </div>\n\n    <ion-card class="full-width" no-margin>\n\n        <ion-list>\n            <a href="tel:1111" ion-item>\n                <ion-icon name="call" item-start></ion-icon>\n                <p ion-text color="primary">Call to General Support</p>\n                <h2 ion-text color="dark">+1 (123) 456-7890</h2>\n            </a>\n            <a href="tel:1111" ion-item>\n                <ion-icon name="call" item-start></ion-icon>\n                <p ion-text color="primary">Call to Lease & Sale Support</p>\n                <h2 ion-text color="dark">+1 (123) 456-7890</h2>\n            </a>\n            <a href="mailto:support@ionproperty.ionic" ion-item>\n                <ion-icon name="mail" item-start></ion-icon>\n                <p ion-text color="primary">Email</p>\n                <h2 ion-text color="dark">support@standeliver.com</h2>\n            </a>\n        </ion-list>\n\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/support/support.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], SupportPage);
    return SupportPage;
}());

//# sourceMappingURL=support.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(447);



// this is the magic wand
Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_walkthrough_walkthrough__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_nearby_nearby__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_restaurant_list_restaurant_list__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_restaurant_filter_restaurant_filter__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_restaurant_detail_restaurant_detail__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_dish_list_dish_list__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_dish_detail_dish_detail__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_category_category__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_cart_cart__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_checkout_checkout__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_orders_orders__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_favorite_list_favorite_list__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_about_about__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_support_support__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_notifications_notifications__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_message_list_message_list__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_message_detail_message_detail__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_your_restaurant_your_restaurant__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_pipes_module__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_message_service_mock__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_restaurant_service_mock__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_dish_service_mock__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_category_service_mock__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_cart_service_mock__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_orders_service_mock__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_status_bar__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_splash_screen__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_keyboard__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_angularfire2__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_38_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_39_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_angularfire2_auth__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_40_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































// Import the AF2 Module



// AF2 Settings
var firebaseConfig = {
    apiKey: "AIzaSyCHBfOtN1SSd5oaVxk_UjthNnrYK1cGLM8",
    authDomain: "standeliver-prototype.firebaseapp.com",
    databaseURL: "https://standeliver-prototype.firebaseio.com",
    projectId: "standeliver-prototype",
    storageBucket: "standeliver-prototype.appspot.com",
    messagingSenderId: "268248628178"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_walkthrough_walkthrough__["a" /* WalkthroughPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_nearby_nearby__["a" /* NearbyPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* MyAccountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_support_support__["a" /* SupportPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_restaurant_list_restaurant_list__["a" /* RestaurantListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_restaurant_filter_restaurant_filter__["a" /* RestaurantFilterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_restaurant_detail_restaurant_detail__["a" /* RestaurantDetailPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_favorite_list_favorite_list__["a" /* FavoriteListPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_dish_list_dish_list__["a" /* DishListPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_dish_detail_dish_detail__["a" /* DishDetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_message_list_message_list__["a" /* MessageListPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_message_detail_message_detail__["a" /* MessageDetailPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_your_restaurant_your_restaurant__["a" /* YourRestaurantPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_orders_orders__["a" /* OrdersPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    scrollPadding: false,
                    scrollAssist: true,
                    autoFocusAssist: false
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__standeliverDB',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                __WEBPACK_IMPORTED_MODULE_28__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_38_angularfire2__["AngularFireModule"].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_39_angularfire2_database__["AngularFireDatabaseModule"],
                __WEBPACK_IMPORTED_MODULE_40_angularfire2_auth__["AngularFireAuthModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_walkthrough_walkthrough__["a" /* WalkthroughPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_nearby_nearby__["a" /* NearbyPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* MyAccountPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_support_support__["a" /* SupportPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_restaurant_list_restaurant_list__["a" /* RestaurantListPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_restaurant_filter_restaurant_filter__["a" /* RestaurantFilterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_restaurant_detail_restaurant_detail__["a" /* RestaurantDetailPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_favorite_list_favorite_list__["a" /* FavoriteListPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_dish_list_dish_list__["a" /* DishListPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_dish_detail_dish_detail__["a" /* DishDetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_message_list_message_list__["a" /* MessageListPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_message_detail_message_detail__["a" /* MessageDetailPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_your_restaurant_your_restaurant__["a" /* YourRestaurantPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_orders_orders__["a" /* OrdersPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_30__providers_restaurant_service_mock__["a" /* RestaurantService */],
                __WEBPACK_IMPORTED_MODULE_31__providers_dish_service_mock__["a" /* DishService */],
                __WEBPACK_IMPORTED_MODULE_32__providers_category_service_mock__["a" /* CategoryService */],
                __WEBPACK_IMPORTED_MODULE_29__providers_message_service_mock__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_33__providers_cart_service_mock__["a" /* CartService */],
                __WEBPACK_IMPORTED_MODULE_34__providers_orders_service_mock__["a" /* OrdersService */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__restaurant_list_restaurant_list__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_restaurant_service_mock__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__restaurant_detail_restaurant_detail__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__restaurant_filter_restaurant_filter__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notifications_notifications__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nearby_nearby__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__category_category__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__orders_orders__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__cart_cart__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var HomePage = (function () {
    function HomePage(navCtrl, popoverCtrl, locationCtrl, modalCtrl, toastCtrl, afd, storage, service) {
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.locationCtrl = locationCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.afd = afd;
        this.storage = storage;
        this.service = service;
        this.searchKey = "";
        this.yourLocation = "";
        this.findAll();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        if (sessionStorage.getItem('currentLocation') == null) {
            document.getElementById('restaurants').style.display = 'none';
            document.getElementById('stadium').style.display = 'none';
            this.setLocation();
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.navCtrl.canSwipeBack();
        sessionStorage.removeItem('restaurant');
        if (sessionStorage.getItem('seatLocation') == null) {
            this.yourLocation = 'Not Set';
        }
        else {
            this.yourLocation = sessionStorage.getItem('seatLocation');
        }
        this.getMessages();
    };
    HomePage.prototype.openRestaurantListPage = function (proptype) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__restaurant_list_restaurant_list__["a" /* RestaurantListPage */], proptype);
    };
    HomePage.prototype.openRestaurantFilterPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__restaurant_filter_restaurant_filter__["a" /* RestaurantFilterPage */]);
        modal.present();
    };
    HomePage.prototype.openNearbyPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__nearby_nearby__["a" /* NearbyPage */]);
    };
    HomePage.prototype.openOrders = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__orders_orders__["a" /* OrdersPage */]);
    };
    HomePage.prototype.openCart = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__cart_cart__["a" /* CartPage */]);
    };
    HomePage.prototype.openRestaurantDetail = function (restaurant) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__restaurant_detail_restaurant_detail__["a" /* RestaurantDetailPage */], restaurant);
    };
    HomePage.prototype.openSettingsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__settings_settings__["a" /* SettingsPage */]);
    };
    HomePage.prototype.openNotificationsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__notifications_notifications__["a" /* NotificationsPage */]);
    };
    HomePage.prototype.openCategoryPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__category_category__["a" /* CategoryPage */]);
    };
    HomePage.prototype.onInput = function (event) {
        var _this = this;
        this.service.findByName(this.searchKey)
            .then(function (data) {
            _this.restaurants = data;
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    HomePage.prototype.onCancel = function (event) {
        this.findAll();
    };
    HomePage.prototype.findAll = function () {
        var _this = this;
        this.afd.list('/restaurants')
            .valueChanges().subscribe(function (data) {
            _this.restaurants = data;
        }, function (err) {
            console.log("problem : ", err);
        });
    };
    HomePage.prototype.setLocation = function () {
        var _this = this;
        var setLocation = this.locationCtrl.create({
            title: 'Set Location',
            message: "It appears you're at AT&T Stadium. Is this correct?",
            buttons: [
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        console.log('Change clicked', data);
                        sessionStorage.setItem('currentLocation', 'AT&T Stadium');
                        document.getElementById('restaurants').style.display = 'block';
                        document.getElementById('stadium').style.display = 'block';
                        var toast = _this.toastCtrl.create({
                            message: 'Concessions for AT&T Stadium now available.',
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
    };
    HomePage.prototype.alertLocation = function () {
        var _this = this;
        var changeLocation = this.locationCtrl.create({
            title: 'We Need Your Seat Location For Delivery',
            message: "Please type your seat and section number you want your food delivered to.",
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Done',
                    handler: function (data) {
                        console.log('Change clicked', data);
                        sessionStorage.setItem('seatLocation', data.location);
                        _this.yourLocation = data.location;
                        var toast = _this.toastCtrl.create({
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
    };
    HomePage.prototype.presentNotifications = function (myEvent) {
        console.log(myEvent);
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_7__notifications_notifications__["a" /* NotificationsPage */]);
        popover.present({
            ev: myEvent
        });
    };
    HomePage.prototype.getMessages = function () {
        var _this = this;
        this.afd.list('/users/' + localStorage.getItem('userID') + '/messages/')
            .valueChanges().subscribe(function (data) {
            _this.messages = data;
            _this.storage.set('messages', _this.messages);
            console.log('messages: ' + JSON.stringify(_this.messages));
        }, function (err) {
            console.log("problem : ", err);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <span ion-text class="fw300">Stan</span><span ion-text class="fw700">deliver</span>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button (click)="openCart()">\n        <ion-icon name="cart"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n	<ion-card no-margin margin-bottom>\n    <div class="imageFrame">\n      <img id="stadium" src="assets/img/attStadium.jpg" />\n    </div>\n    <ion-item class="lightest-bg">\n      <h3 ion-text no-margin color="dark" class="fw500 no-margin">Your Seat:</h3>\n      <span ion-text class="no-margin seat" color="primary">{{yourLocation}}</span>\n      <button ion-button outline round item-end icon-right color="primary" (click)="alertLocation()">\n      	Set Seat\n      	<ion-icon name="locate"></ion-icon>\n      </button>\n    </ion-item>\n	</ion-card>\n\n  <ion-list no-margin id="restaurants">\n    <button ion-item *ngFor="let restaurant of restaurants" (click)="openRestaurantDetail(restaurant)">\n      <ion-thumbnail item-start>\n          <img src="{{restaurant.thumbnail}}">\n      </ion-thumbnail>\n      <h3 ion-text color="dark" class="fw500">{{restaurant.title}}</h3>\n      <p ion-text class="text-12x"><span ion-text color="secondary" class="fw700">{{restaurant.tags}}</span> ∙ <span ion-text color="primary">{{ restaurant.price }}</span></p>\n      <p ion-text class="text-12x">{{restaurant.address}}</p>\n			<ion-badge class="white-bg text-secondary" item-end>\n				<ion-icon name="star"></ion-icon>\n				{{ restaurant.rating | number:\'1.1\' }}\n			</ion-badge>\n    </button>\n  </ion-list>\n\n  <!-- <div padding>\n    <button ion-button round block color="secondary" (click)="openRestaurantListPage()">\n      See more\n    </button>\n  </div> -->\n\n</ion-content>\n\n<ion-footer class="no-padding">\n	<ion-grid class="btn-group" no-padding>\n		<ion-row no-padding>\n			<!-- <button ion-button icon-left block color="primary" (click)="openNearbyPage()" class="col col-4">\n        	<ion-icon name="compass" class="text-18x"></ion-icon>\n        	<span ion-text class="text-12x">Nearby Concessions</span>\n			</button> -->\n			<!-- <button ion-button icon-left block color="primary" (click)="openCategoryPage()" class="col col-4">\n          <ion-icon name="albums" class="text-18x"></ion-icon>\n          <span ion-text class="text-12x">By Category</span>\n			</button> -->\n			<button ion-button icon-left block color="primary" (click)="openOrders()" class="col col-4">\n        	<ion-icon name="list-box" class="text-18x"></ion-icon>\n        	<span ion-text class="text-12x">Past Orders</span>\n			</button>\n		</ion-row>\n	</ion-grid>\n\n</ion-footer>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["AngularFireDatabase"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12_angularfire2_database__["AngularFireDatabase"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__providers_restaurant_service_mock__["a" /* RestaurantService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_restaurant_service_mock__["a" /* RestaurantService */]) === "function" && _h || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_walkthrough_walkthrough__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_my_account_my_account__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_favorite_list_favorite_list__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_support_support__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_message_list_message_list__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_cart_cart__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_walkthrough_walkthrough__["a" /* WalkthroughPage */];
        this.initializeApp();
        this.homeItem = { component: __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */] };
        this.messagesItem = { component: __WEBPACK_IMPORTED_MODULE_11__pages_message_list_message_list__["a" /* MessageListPage */] };
        this.appMenuItems = [
            // {title: 'Restaurants', component: RestaurantListPage, icon: 'home'},
            // {title: 'Dish List', component: DishListPage, icon: 'pizza'},
            // {title: 'Nearby', component: NearbyPage, icon: 'compass'},
            // {title: 'By Category', component: CategoryPage, icon: 'albums'},
            { title: 'Past Orders', component: __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__["a" /* OrdersPage */], icon: 'list-box' },
            { title: 'Cart', component: __WEBPACK_IMPORTED_MODULE_13__pages_cart_cart__["a" /* CartPage */], icon: 'cart' },
            { title: 'Favorite Restaurants', component: __WEBPACK_IMPORTED_MODULE_8__pages_favorite_list_favorite_list__["a" /* FavoriteListPage */], icon: 'heart' }
        ];
        // this.yourRestaurantMenuItems = [
        //     {title: 'Register Restaurant', component: YourRestaurantPage, icon: 'clipboard'}
        // ];
        this.accountMenuItems = [
            { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth__["a" /* AuthPage */], icon: 'log-in' },
            { title: 'My Account', component: __WEBPACK_IMPORTED_MODULE_7__pages_my_account_my_account__["a" /* MyAccountPage */], icon: 'contact' },
        ];
        this.helpMenuItems = [
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */], icon: 'information-circle' },
            { title: 'Support', component: __WEBPACK_IMPORTED_MODULE_10__pages_support_support__["a" /* SupportPage */], icon: 'call' },
            // {title: 'App Settings', component: SettingsPage, icon: 'cog'},
            { title: 'Walkthrough', component: __WEBPACK_IMPORTED_MODULE_5__pages_walkthrough_walkthrough__["a" /* WalkthroughPage */], icon: 'photos' }
        ];
        this.name = localStorage.getItem('userEmail');
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/app/app.html"*/'<ion-menu [content]="content" class="menu-bg">\n\n  <ion-header>\n    <ion-toolbar class="user-profile">\n\n      <div class="user-profile">\n        <ion-list no-margin>\n          <ion-item>\n            <h2 ion-text class="text-white fw700 text-15x">\n              {{name}}\n            </h2>\n\n				    <button ion-button icon-left round color="primary" menuClose (click)="openPage(accountMenuItems[1])">\n				      <ion-icon [name]="accountMenuItems[1].icon"></ion-icon>\n				      {{accountMenuItems[1].title}}\n				    </button>\n\n          </ion-item>\n        </ion-list>\n      </div>\n\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content color="dark" class="profile-bg">\n    <!-- <button ion-button icon-left full color="secondary" no-margin menuClose (click)="openPage(accountMenuItems[2])">\n      <ion-icon [name]="accountMenuItems[2].icon"></ion-icon>\n      {{accountMenuItems[2].title}}\n    </button> -->\n\n    <ion-list class="user-list">\n      <button menuClose ion-item (click)="openPage(homeItem)">\n        <ion-icon item-left name="browsers"></ion-icon>\n        Home\n      </button>\n\n      <button menuClose ion-item (click)="openPage(messagesItem)">\n        <ion-icon item-left name="mail"></ion-icon>\n        Messages\n        <!-- <ion-badge color="dark">\n          2\n        </ion-badge> -->\n      </button>\n      <button menuClose ion-item *ngFor="let menuItem of appMenuItems" (click)="openPage(menuItem)">\n        <ion-icon item-left [name]="menuItem.icon"></ion-icon>\n        {{menuItem.title}}\n      </button>\n    </ion-list>\n\n    <!-- <ion-list class="user-list">\n      <ion-list-header no-margin>\n        <span ion-text color="light" class="fw500">Your Restaurant</span>\n      </ion-list-header>\n      <button menuClose ion-item *ngFor="let menuItem of yourRestaurantMenuItems" (click)="openPage(menuItem)">\n        <ion-icon item-left [name]="menuItem.icon"></ion-icon>\n        {{menuItem.title}}\n      </button>\n    </ion-list> -->\n\n    <ion-list class="user-list">\n      <ion-list-header no-margin>\n        <span ion-text color="light" class="fw500">Help & Settings</span>\n      </ion-list-header>\n      <button menuClose ion-item *ngFor="let menuItem of helpMenuItems" (click)="openPage(menuItem)">\n        <ion-icon item-left [name]="menuItem.icon"></ion-icon>\n        {{menuItem.title}}\n      </button>\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var restaurants = [
    {
        id: 1,
        address: "Section A",
        city: "Arlington",
        state: "TX",
        zip: "76001",
        title: "Sausage Supreme",
        long: -97.0945991,
        lat: 32.7478761,
        picture: "assets/img/restaurants/restaurant01.jpg",
        thumbnail: "assets/img/restaurants/restaurant01sq.jpg",
        images: [
            "assets/img/restaurants/restaurant01.jpg",
            "assets/img/restaurants/restaurant03.jpg",
            "assets/img/restaurants/restaurant05.jpg",
            "assets/img/restaurants/restaurant07.jpg"
        ],
        tags: "Stadium Food",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus explicabo rem incidunt, sequi facilis hic corporis rerum ea in dolorum tempore, a quod quae nostrum voluptatem sint. Saepe, ut, autem!",
        label: "open",
        period: "none",
        price: "$$$",
        rating: 4.4,
        dishes: {
            id: 1,
            name: "Caroline Seymor",
            title: "Senior Broker",
            picture: "assets/img/dishes/caroline_seymor.jpg"
        },
        reviews: [
            {
                id: 1,
                username: "Oliver Bishop",
                from: "Chesterfield, UK",
                title: "Nice place, as long as you don't want to leave",
                content: "The staff were very helpful in all ways, nothing was too much trouble. The bar had a fantastic happy hour being good nibbles and great value. One of my best restaurants.",
                rating: 4
            },
            {
                id: 2,
                username: " Alejandro Suarez",
                from: "Bogotá, CO",
                title: "Close to old quarter",
                content: "Nice dishes Staff very helpful. Easy to get cabs",
                rating: 4
            },
            {
                id: 3,
                username: "Matt Doley",
                from: "Cincinnati, US",
                title: "Short stay",
                content: "Restaurant reception staff speak limited English and not so friendly. Their dessert is not good enough.",
                rating: 3
            },
            {
                id: 4,
                username: "Jorge Silva",
                from: "São Paulo, BR",
                title: "Disappointing and overpriced",
                content: "Disappointing stay as the condition of the restaurant was the exact opposite of last restaurant, but the staff was helpful.",
                rating: 2
            }
        ]
    },
    {
        id: 2,
        address: "Section D",
        city: "Arlington",
        state: "TX",
        zip: "02420",
        title: "Lorem Restaurant",
        long: -97.0944991,
        lat: 32.7478561,
        picture: "assets/img/restaurants/restaurant02.jpg",
        thumbnail: "assets/img/restaurants/restaurant02sq.jpg",
        images: [
            "assets/img/restaurants/restaurant02.jpg",
            "assets/img/restaurants/restaurant04.jpg",
            "assets/img/restaurants/restaurant06.jpg",
            "assets/img/restaurants/restaurant08.jpg"
        ],
        tags: "Variable",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus explicabo rem incidunt, sequi facilis hic corporis rerum ea in dolorum tempore, a quod quae nostrum voluptatem sint. Saepe, ut, autem!",
        label: "open",
        period: "none",
        price: "$$$$",
        rating: 5,
        dishes: {
            id: 1,
            name: "Caroline Seymor",
            title: "Senior Broker",
            picture: "assets/img/dishes/caroline_seymor.jpg"
        },
        reviews: [
            {
                id: 1,
                username: "Oliver Bishop",
                from: "Chesterfield, UK",
                title: "Nice place, as long as you don't want to leave",
                content: "The hotel staff were very helpful in all ways, nothing was too much trouble. The bar had a fantastic happy hour being good nibbles and great value. One of my best restaurants.",
                rating: 4
            },
            {
                id: 2,
                username: " Alejandro Suarez",
                from: "Bogotá, CO",
                title: "Close to old quarter",
                content: "Nice dishes Staff very helpful. Easy to get cabs",
                rating: 4
            },
            {
                id: 3,
                username: "Matt Doley",
                from: "Cincinnati, US",
                title: "Short stay",
                content: "Restaurant reception staff speak limited English and not so friendly. Their dessert is not good enough.",
                rating: 3
            },
            {
                id: 4,
                username: "Jorge Silva",
                from: "São Paulo, BR",
                title: "Disappointing and overpriced",
                content: "Disappointing stay as the condition of the restaurant was the exact opposite of last restaurant, but the staff was helpful.",
                rating: 2
            }
        ]
    }
];
/* harmony default export */ __webpack_exports__["a"] = (restaurants);
//# sourceMappingURL=mock-restaurants.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var dishes = [
    {
        id: 1,
        name: "Chicken Tenders",
        ingredients: "chicken",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish01.jpg",
        price: 12.5,
        qtd: 0
    },
    {
        id: 2,
        name: "Pulled Pork Sandwich",
        ingredients: "pulled pork, bun, bbq sauce",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish02.jpg",
        price: 6.25,
        qtd: 0
    },
    {
        id: 3,
        name: "Cheese Burger",
        ingredients: "beef patty, sesame bun, lettuce, tomatoe, pickle, cheese",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish03.jpg",
        price: 23,
        qtd: 0
    },
    {
        id: 4,
        name: "Hot Dog",
        ingredients: "hot dog, bun, chili, cheese, onions",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish04.jpg",
        price: 7.75,
        qtd: 0
    },
    {
        id: 5,
        name: "Hot Link Sandwich",
        ingredients: "hot link, bun, onions, saurkraut, cheese",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish05.jpg",
        price: 30,
        qtd: 0
    },
    {
        id: 6,
        name: "Nachos",
        ingredients: "corn chips, cheese, pico de gallo, green onions, sour cream",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish06.jpg",
        price: 15,
        qtd: 0
    },
    {
        id: 7,
        name: "Sausage On A Stick",
        ingredients: "sausage, mustard, spices",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish07.jpg",
        price: 17.45,
        qtd: 0
    },
    {
        id: 8,
        name: "Cinnamon Roll",
        ingredients: "cinnamon roll, icing",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus at consequuntur dolores, ea reprehenderit ipsam voluptas nulla recusandae.",
        picture: "assets/img/dishes/dish08.jpg",
        price: 10.5,
        qtd: 0
    }
];
/* harmony default export */ __webpack_exports__["a"] = (dishes);
//# sourceMappingURL=mock-dishes.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var categories = [
    {
        id: 1,
        name: "Pizza",
        picture: "assets/img/restaurants/restaurant01.jpg",
        quantity: 41
    },
    {
        id: 2,
        name: "Pasta",
        picture: "assets/img/restaurants/restaurant02.jpg",
        quantity: 64
    },
    {
        id: 3,
        name: "Variable",
        picture: "assets/img/restaurants/restaurant03.jpg",
        quantity: 64
    },
    {
        id: 4,
        name: "Barbecue",
        picture: "assets/img/restaurants/restaurant04.jpg",
        quantity: 28
    }
];
/* harmony default export */ __webpack_exports__["a"] = (categories);
//# sourceMappingURL=mock-categories.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DishListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dish_service_mock__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dish_detail_dish_detail__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DishListPage = (function () {
    function DishListPage(navCtrl, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        service.findAll().then(function (data) { return _this.dishes = data; });
    }
    DishListPage.prototype.openDishDetail = function (broker) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__dish_detail_dish_detail__["a" /* DishDetailPage */], broker);
    };
    DishListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dish-list',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/dish-list/dish-list.html"*/'<ion-header>\n	<ion-navbar color="primary">\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n		<ion-title>\n			<span ion-text>Dish list</span>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="lightest-bg">\n\n	<ion-list>\n\n	  <ion-item *ngFor="let dish of dishes" tapplable (click)="openDishDetail(dish)">\n		<ion-thumbnail item-start>\n		  <img src="{{dish.picture}}">\n		</ion-thumbnail>\n		<h2 ion-text color="dark" class="fw500">{{dish.name}}</h2>\n		<p ion-text color="primary" class="text-11x">{{ dish.ingredients }}</p>\n		<button ion-button clear class="green-bg text-white" item-end>{{ dish.price | currency:\'USD\':true }}</button>\n	  </ion-item>\n\n	</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/dish-list/dish-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_dish_service_mock__["a" /* DishService */]])
    ], DishListPage);
    return DishListPage;
}());

//# sourceMappingURL=dish-list.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YourRestaurantPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YourRestaurantPage = (function () {
    function YourRestaurantPage(_fb, navCtrl, loadingCtrl, toastCtrl) {
        this._fb = _fb;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
    }
    YourRestaurantPage.prototype.ngOnInit = function () {
        this.onYourRestaurantForm = this._fb.group({
            profiledata: [true, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])],
            restaurantTitle: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])],
            restaurantAddress: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])],
            restaurantType: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])]
        });
    };
    // process send button
    YourRestaurantPage.prototype.sendData = function () {
        var _this = this;
        // send booking info
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        // show message
        var toast = this.toastCtrl.create({
            showCloseButton: true,
            cssClass: 'profiles-bg',
            message: 'Your restaurant was registered!',
            duration: 3000,
            position: 'bottom'
        });
        loader.present();
        setTimeout(function () {
            loader.dismiss();
            toast.present();
            // back to home page
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }, 3000);
    };
    YourRestaurantPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'your-restaurant',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/your-restaurant/your-restaurant.html"*/'<ion-header>\n    <ion-navbar  color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n            <span ion-text>Your Restaurant</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="your-restaurant lightest-bg">\n\n    <ion-card class="primary-bg">\n      <ion-card-content>\n        <p class="text-white">Complete the form with your restaurant data and register it.</p>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-content>\n        <form [formGroup]="onYourRestaurantForm" class="list-form">\n          <ion-list margin-bottom>\n            <ion-item>\n              <ion-label>Complement with my account/profile data:</ion-label>\n              <ion-checkbox formControlName="profiledata"></ion-checkbox>\n            </ion-item>\n            <p ion-text color="danger" class="text-1x has-error" *ngIf="onYourRestaurantForm.get(\'profiledata\').touched && onYourRestaurantForm.get(\'profiledata\').hasError(\'required\')">This field is required</p>\n\n            <ion-item>\n              <ion-label color="primary" stacked>Restaurant title:</ion-label>\n              <ion-input type="text" placeholder="Type here..." formControlName="restaurantTitle"></ion-input>\n            </ion-item>\n            <p ion-text color="danger" class="text-1x has-error" *ngIf="onYourRestaurantForm.get(\'restaurantTitle\').touched && onYourRestaurantForm.get(\'restaurantTitle\').hasError(\'required\')">This field is required</p>\n\n            <ion-item>\n              <ion-label color="primary" stacked>Restaurant Address:</ion-label>\n              <ion-input type="text" placeholder="Type here..." formControlName="restaurantAddress"></ion-input>\n            </ion-item>\n            <p ion-text color="danger" class="text-1x has-error" *ngIf="onYourRestaurantForm.get(\'restaurantAddress\').touched && onYourRestaurantForm.get(\'restaurantAddress\').hasError(\'required\')">This field is required</p>\n\n            <ion-item>\n              <ion-label color="primary" stacked>Restaurant Type:</ion-label>\n              <ion-select formControlName="restaurantType">\n                <ion-option value="house">Pasta</ion-option>\n                <ion-option value="mansion">Pizza</ion-option>\n                <ion-option value="Apartment">Fast Food</ion-option>\n                <ion-option value="comroom">Street Food</ion-option>\n                <ion-option value="farm">Barbecue</ion-option>\n                <ion-option value="farm">Veggie</ion-option>\n              </ion-select>\n            </ion-item>\n\n\n          </ion-list>\n\n          <div padding-vertical>\n            <h5 ion-text color="dark" margin-bottom class="fw500">Add Images of Restaurant <span ion-text class="fw300">(Max. 5)</span></h5>\n            <button ion-button icon-only color="light">\n              <ion-icon name="photos" color="dark"></ion-icon>\n            </button>\n            <button ion-button icon-only color="light">\n              <ion-icon name="photos" color="dark"></ion-icon>\n            </button>\n            <button ion-button icon-only color="light">\n              <ion-icon name="photos" color="dark"></ion-icon>\n            </button>\n            <button ion-button icon-only color="light">\n              <ion-icon name="photos" color="dark"></ion-icon>\n            </button>\n            <button ion-button icon-only color="light">\n              <ion-icon name="photos" color="dark"></ion-icon>\n            </button>\n          </div>\n\n          <div padding-vertical>\n            <h5 ion-text color="dark" margin-bottom class="fw500">Add Dishes</h5>\n\n	          <ion-list margin-bottom>\n	            <ion-item>\n              	<ion-label color="primary" stacked>Dish Name:</ion-label>\n              	<ion-input type="text" placeholder="Type here..."></ion-input>\n	            </ion-item>\n	            <ion-item>\n	              <ion-label color="primary" stacked>Dish Type:</ion-label>\n	              <ion-select formControlName="restaurantType">\n	                <ion-option value="house">Pasta</ion-option>\n	                <ion-option value="mansion">Pizza</ion-option>\n	                <ion-option value="Apartment">Fast Food</ion-option>\n	                <ion-option value="comroom">Street Food</ion-option>\n	                <ion-option value="farm">Barbecue</ion-option>\n	                <ion-option value="farm">Veggie</ion-option>\n	              </ion-select>\n	            </ion-item>\n	            <ion-item>\n              	<ion-label color="primary" stacked>Dish Ingredients:</ion-label>\n              	<ion-textarea rows="5" placeholder="Type here..."></ion-textarea>\n	            </ion-item>\n	            <ion-item>\n              	<ion-label color="primary" stacked>Dish Price:</ion-label>\n              	<ion-input type="text" placeholder="Type here..."></ion-input>\n	            </ion-item>\n	            <ion-item>\n		            <h6 ion-text color="dark" margin-bottom class="fw500">Add Images of Dish <span ion-text class="fw300">(Max. 5)</span></h6>\n		            <button ion-button icon-only color="light">\n		              <ion-icon name="photos" color="dark"></ion-icon>\n		            </button>\n		            <button ion-button icon-only color="light">\n		              <ion-icon name="photos" color="dark"></ion-icon>\n		            </button>\n		            <button ion-button icon-only color="light">\n		              <ion-icon name="photos" color="dark"></ion-icon>\n		            </button>\n		            <button ion-button icon-only color="light">\n		              <ion-icon name="photos" color="dark"></ion-icon>\n		            </button>\n		            <button ion-button icon-only color="light">\n		              <ion-icon name="photos" color="dark"></ion-icon>\n		            </button>\n	            </ion-item>\n	          </ion-list>\n	         </div>\n\n          <button ion-button block color="dark" (click)="sendData()" [disabled]="!onYourRestaurantForm.valid">Register</button>\n        </form>\n      </ion-card-content>\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/your-restaurant/your-restaurant.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */]])
    ], YourRestaurantPage);
    return YourRestaurantPage;
}());

//# sourceMappingURL=your-restaurant.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__term_search__ = __webpack_require__(531);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__term_search__["a" /* TermSearchPipe */],
            ],
            imports: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__term_search__["a" /* TermSearchPipe */]
            ]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermSearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TermSearchPipe = (function () {
    function TermSearchPipe() {
    }
    TermSearchPipe.prototype.transform = function (value, query, field) {
        return query ? value.reduce(function (prev, next) {
            if (next[field].includes(query)) {
                prev.push(next);
            }
            return prev;
        }, []) : value;
    };
    TermSearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'termSearch',
            pure: false
        }),
        __metadata("design:paramtypes", [])
    ], TermSearchPipe);
    return TermSearchPipe;
}());

//# sourceMappingURL=term-search.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_restaurants__ = __webpack_require__(520);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var RestaurantService = (function () {
    function RestaurantService() {
        this.favoriteCounter = 0;
        this.favorites = [];
    }
    RestaurantService.prototype.findAll = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_restaurants__["a" /* default */]);
    };
    RestaurantService.prototype.findById = function (id) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_restaurants__["a" /* default */][id - 1]);
    };
    RestaurantService.prototype.findByName = function (searchKey) {
        var key = searchKey.toUpperCase();
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_restaurants__["a" /* default */].filter(function (restaurant) {
            return (restaurant.title + ' ' + restaurant.address + ' ' + restaurant.city + ' ' + restaurant.description).toUpperCase().indexOf(key) > -1;
        }));
    };
    RestaurantService.prototype.getFavorites = function () {
        return Promise.resolve(this.favorites);
    };
    RestaurantService.prototype.favorite = function (restaurant) {
        this.favoriteCounter = this.favoriteCounter + 1;
        this.favorites.push({ id: this.favoriteCounter, restaurant: restaurant });
        return Promise.resolve();
    };
    RestaurantService.prototype.unfavorite = function (favorite) {
        var index = this.favorites.indexOf(favorite);
        if (index > -1) {
            this.favorites.splice(index, 1);
        }
        return Promise.resolve();
    };
    RestaurantService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], RestaurantService);
    return RestaurantService;
}());

//# sourceMappingURL=restaurant-service-mock.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import {RegisterPage} from "../register/register";
var AuthPage = (function () {
    function AuthPage(_fb, afd, nav, forgotCtrl, menu, toastCtrl, loadingCtrl, modalCtrl, alertCtrl, navCtrl, afAuth) {
        this._fb = _fb;
        this.afd = afd;
        this.nav = nav;
        this.forgotCtrl = forgotCtrl;
        this.menu = menu;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.auth = "login";
        this.menu.swipeEnable(false);
    }
    AuthPage.prototype.ngOnInit = function () {
        this.onLoginForm = this._fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])]
        });
        this.onRegisterForm = this._fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
                ])]
        });
    };
    AuthPage.prototype.signupUser = function () {
        var _this = this;
        if (this.onRegisterForm.valid) {
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            this.afAuth.auth.createUserWithEmailAndPassword(this.onRegisterForm.value.email, this.onRegisterForm.value.password)
                .then(function (newUser) {
                localStorage.setItem('userID', newUser.user.uid);
                localStorage.setItem('username', name);
                localStorage.setItem('loggedIn', 'true');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                _this.afd.list('/users').update(newUser.user.uid, {
                    email: newUser.user.email,
                    messages: {
                        "date": "2017-11-01T00:00:00.000-0300",
                        "email": "info@standeliver.com",
                        "id": 1,
                        "message": "Welcome to the app!",
                        "read": false,
                        "senderId": 1,
                        "senderName": "Standeliver",
                        "title": "Welcome!"
                    }
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading.dismiss();
        }
    };
    AuthPage.prototype.login = function () {
        var _this = this;
        if (this.onLoginForm.valid) {
            this.afAuth.auth.signInWithEmailAndPassword(this.onLoginForm.value.email, this.onLoginForm.value.password)
                .then(function (authData) {
                console.log(JSON.stringify(authData));
                console.log(_this.afd.list('/restaurants'));
                localStorage.setItem('userEmail', authData.user.email);
                localStorage.setItem('userName', authData.user.displayName);
                localStorage.setItem('userID', authData.user.uid);
                localStorage.setItem('loggedIn', 'true');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Error',
                    message: error.message,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        }
    };
    AuthPage.prototype.forgotPass = function () {
        var _this = this;
        var forgot = this.forgotCtrl.create({
            title: 'Forgot Password?',
            message: "Enter you email address to send a reset link password.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email',
                    type: 'email'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        console.log('Send clicked');
                        var toast = _this.toastCtrl.create({
                            message: 'Email was sended successfully',
                            duration: 3000,
                            position: 'top',
                            cssClass: 'dark-trans',
                            closeButtonText: 'OK',
                            showCloseButton: true
                        });
                        toast.present();
                    }
                }
            ]
        });
        forgot.present();
    };
    AuthPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-auth',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/auth/auth.html"*/'<!-- -->\n<ion-content padding class="profiles-bg">\n	<div class="auth-content">\n\n		<!-- Logo -->\n		<div padding-horizontal text-center>\n			<div class="logo">\n				<img src="assets/img/foodIonic-ico.png">\n			</div>\n			<h2 color="white" ion-text no-margin>\n				stand<strong>deliver</strong>\n			</h2>\n		</div>\n\n		<div padding-vertical>\n		  <ion-segment [(ngModel)]="auth" color="light">\n		    <ion-segment-button value="login">\n		      Login\n		    </ion-segment-button>\n		    <ion-segment-button value="register">\n		      Register\n		    </ion-segment-button>\n		  </ion-segment>\n		</div>\n\n		<div [ngSwitch]="auth">\n			<!-- Login form -->\n			<div id="loginForm" *ngSwitchCase="\'login\'">\n				<form [formGroup]="onLoginForm" (submit)="login()" class="list-form">\n					<ion-item>\n						<ion-label floating>\n							<ion-icon name="mail" item-start class="text-white"></ion-icon>\n							Email\n						</ion-label>\n						<ion-input type="email" formControlName="email"></ion-input>\n					</ion-item>\n					<p ion-text color="danger" class="text-12x has-error" *ngIf="onLoginForm.get(\'email\').touched && onLoginForm.get(\'email\').hasError(\'required\')">This field is required</p>\n\n					<ion-item>\n						<ion-label floating>\n							<ion-icon name="lock" item-start class="text-white"></ion-icon>\n							Password\n						</ion-label>\n						<ion-input type="password" formControlName="password"></ion-input>\n					</ion-item>\n					<p ion-text color="danger" class="text-12x has-error" *ngIf="onLoginForm.get(\'password\').touched && onLoginForm.get(\'password\').hasError(\'required\')">This field is required</p>\n				</form>\n\n				<p text-right ion-text color="light" tappable (click)="forgotPass()"><strong>Forgot Password?</strong></p>\n\n				<div>\n					<button ion-button icon-start block color="secondary" (click)="login()" [disabled]="!onLoginForm.valid">\n						<ion-icon name="log-in"></ion-icon>\n						SIGN IN\n					</button>\n\n					<p text-center ion-text color="light">Or Sign in with:</p>\n\n					<ion-grid class="btn-group">\n						<ion-row>\n							<button ion-button icon-only block class="btn-facebook col col-4">\n								<ion-icon name="logo-facebook"></ion-icon>\n							</button>\n							<button ion-button icon-only block class="btn-twitter col col-4">\n								<ion-icon name="logo-twitter"></ion-icon>\n							</button>\n							<button ion-button icon-only block class="btn-gplus col col-4">\n								<ion-icon name="logo-googleplus"></ion-icon>\n							</button>\n						</ion-row>\n					</ion-grid>\n\n				</div>\n			</div>\n\n			<div id="registerForm" *ngSwitchCase="\'register\'">\n		    <!-- Register form -->\n		    <form [formGroup]="onRegisterForm" class="list-form">\n		      <ion-item>\n		        <ion-label floating>\n		          <ion-icon name="mail" item-start class="text-white"></ion-icon>\n		          Email\n		        </ion-label>\n		        <ion-input type="email" formControlName="email"></ion-input>\n		      </ion-item>\n		      <p ion-text color="danger" class="text-12x has-error" *ngIf="onRegisterForm.get(\'email\').touched && onRegisterForm.get(\'email\').hasError(\'required\')">This field is required</p>\n\n		      <ion-item>\n		        <ion-label floating>\n		          <ion-icon name="lock" item-start class="text-white"></ion-icon>\n		          Password\n		        </ion-label>\n		        <ion-input type="password" formControlName="password"></ion-input>\n		      </ion-item>\n		      <p ion-text color="danger" class="text-12x has-error" *ngIf="onRegisterForm.get(\'password\').touched && onRegisterForm.get(\'password\').hasError(\'required\')">This field is required</p>\n		    </form>\n\n		    <div margin-top>\n		      <button ion-button block color="secondary" (click)="signupUser()" [disabled]="!onRegisterForm.valid">\n		        SIGN UP\n		      </button>\n\n		      <p text-center ion-text color="light">Or Sign Up with:</p>\n\n		      <ion-grid class="btn-group">\n		        <ion-row>\n		          <button ion-button icon-only block class="btn-facebook col col-4">\n		            <ion-icon name="logo-facebook"></ion-icon>\n		          </button>\n		          <button ion-button icon-only block class="btn-twitter col col-4">\n		            <ion-icon name="logo-twitter"></ion-icon>\n		          </button>\n		          <button ion-button icon-only block class="btn-gplus col col-4">\n		            <ion-icon name="logo-googleplus"></ion-icon>\n		          </button>\n		        </ion-row>\n		      </ion-grid>\n		    </div>\n		  </div>\n\n		</div>\n\n\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/auth/auth.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["AngularFireAuth"]])
    ], AuthPage);
    return AuthPage;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dish_detail_dish_detail__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_restaurant_service_mock__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dish_service_mock__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_cart_service_mock__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart_cart__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_leaflet__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RestaurantDetailPage = (function () {
    function RestaurantDetailPage(actionSheetCtrl, navCtrl, navParams, cartService, restaurantService, dishService, afd, toastCtrl) {
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartService = cartService;
        this.restaurantService = restaurantService;
        this.dishService = dishService;
        this.afd = afd;
        this.toastCtrl = toastCtrl;
        this.restaurantopts = 'menu';
        this.restaurant = this.navParams.data;
        console.log(this.restaurant);
        sessionStorage.setItem('restaurant', this.restaurant.id);
        this.getFood();
    }
    RestaurantDetailPage.prototype.getFood = function () {
        var _this = this;
        this.afd.list('/restaurants/' + this.restaurant.id + '/food')
            .valueChanges().subscribe(function (data) {
            _this.food = data;
        }, function (err) {
            console.log("problem : ", err);
        });
    };
    RestaurantDetailPage.prototype.openDishDetail = function (food) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dish_detail_dish_detail__["a" /* DishDetailPage */], food);
    };
    RestaurantDetailPage.prototype.favorite = function (restaurant) {
        var _this = this;
        this.restaurantService.favorite(restaurant)
            .then(function (restaurant) {
            var toast = _this.toastCtrl.create({
                message: 'Restaurant added to your favorites',
                cssClass: 'mytoast',
                duration: 2000
            });
            toast.present(toast);
        });
    };
    RestaurantDetailPage.prototype.share = function (restaurant) {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: function () { return console.log('share via twitter'); }
                },
                {
                    text: 'Facebook',
                    handler: function () { return console.log('share via facebook'); }
                },
                {
                    text: 'Email',
                    handler: function () { return console.log('share via email'); }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { return console.log('cancel share'); }
                }
            ]
        });
        actionSheet.present();
    };
    RestaurantDetailPage.prototype.openCart = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__cart_cart__["a" /* CartPage */]);
    };
    RestaurantDetailPage.prototype.showMarkers = function () {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = __WEBPACK_IMPORTED_MODULE_7_leaflet___default.a.layerGroup([]);
        var marker = __WEBPACK_IMPORTED_MODULE_7_leaflet___default.a.marker([this.restaurant.lat, this.restaurant.long]);
        marker.data = this.restaurant;
        this.markersGroup.addLayer(marker);
        this.map.addLayer(this.markersGroup);
    };
    RestaurantDetailPage.prototype.showMap = function () {
        var _this = this;
        setTimeout(function () {
            _this.map = __WEBPACK_IMPORTED_MODULE_7_leaflet___default.a.map("map-detail").setView([_this.restaurant.lat, _this.restaurant.long], 16);
            __WEBPACK_IMPORTED_MODULE_7_leaflet___default.a.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(_this.map);
            _this.showMarkers();
        }, 200);
    };
    RestaurantDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-restaurant-detail',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/restaurant-detail/restaurant-detail.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      <span ion-text>Restaurant</span>\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="favorite(restaurant)">\n        <ion-icon name="heart"></ion-icon>\n      </button>\n      <button ion-button (click)="share(restaurant)">\n          <ion-icon name="share"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="lightest-bg">\n  <ion-card *ngIf="restaurant.id" class="full-width" no-margin>\n  	<div class="card-img-wrap">\n      <span ion-text class="card-img-status fw700 text-white" [ngClass]="{\'closed\': restaurant.label === \'closed\', \'open\': restaurant.label === \'open\'}">\n        {{ restaurant.label }}\n      </span>\n		  <ion-slides class="to-top primary-bg" pager>\n		    <ion-slide *ngFor="let image of restaurant.images">\n		      <img src="{{ image }}" alt="">\n		    </ion-slide>\n		  </ion-slides>\n		</div>\n    <!-- <img src="{{restaurant.picture}}"> -->\n    <ion-card-content>\n      <h1 ion-text color="dark" class="card-title fw700" text-center>\n      	{{restaurant.title}}\n     	</h1>\n      <p ion-text color="primary" text-center>{{restaurant.address}} • {{restaurant.price}}</p>\n      <div text-center>\n		<ion-badge color="secondary">{{restaurant.tags}}</ion-badge>\n      	<ion-badge color="dark" class="text-11x">\n					<ion-icon name="star"></ion-icon>\n        	{{ restaurant.rating | number:\'1.1\' }}\n        </ion-badge>\n			</div>\n    </ion-card-content>\n\n	  <ion-segment [(ngModel)]="restaurantopts" padding-horizontal>\n	    <ion-segment-button value="menu">\n	      Menu\n	    </ion-segment-button>\n	    <ion-segment-button value="reviews">\n	      Reviews\n	    </ion-segment-button>\n	    <ion-segment-button value="info" (click)="showMap()">\n	      Location\n	    </ion-segment-button>\n	  </ion-segment>\n\n		<div [ngSwitch]="restaurantopts" padding>\n			<div *ngSwitchCase="\'menu\'">\n\n				<ion-list>\n				  <ion-item no-padding *ngFor="let dish of food" tapplable (click)="openDishDetail(dish)">\n				    <ion-thumbnail item-start>\n				      <img src="{{dish.picture}}">\n				    </ion-thumbnail>\n	          <h2 ion-text color="dark" class="fw500">{{dish.name}}</h2>\n	          <p ion-text color="primary" class="text-11x">{{ dish.ingredients }}</p>\n				    <button ion-button clear class="secondary-bg text-white" item-end>{{ dish.price | currency:\'USD\':true }}</button>\n				  </ion-item>\n				</ion-list>\n\n				<br><br><br><br>\n\n			</div>\n			<div *ngSwitchCase="\'reviews\'" class="tab-reviews">\n\n			  <!--list of reviews-->\n			  <ion-list class="list-full-border">\n			    <ion-item *ngFor="let review of restaurant.reviews" margin-bottom text-wrap>\n\n		        <h2 class="fw700">\n			      	<ion-badge color="secondary" class="text-1x">\n								<ion-icon name="star"></ion-icon>\n			        	{{ review.rating | number:\'1.1\' }}\n			        </ion-badge>\n		        {{ review.title }}</h2>\n\n			      <p ion-text>\n			        {{ review.content }}\n			      </p>\n			      <span ion-text class="author text-11x">{{ review.username }} from {{ review.from }}</span>\n\n			    </ion-item>\n			  </ion-list>\n			  <br><br>\n\n			</div>\n			<div *ngSwitchCase="\'info\'">\n			  <!-- Show map here -->\n			  <div id="map-detail" class="map" margin-bottom></div>\n				<p ion-text text-center color="dark" class="fw700">{{restaurant.address}}, {{restaurant.city}} {{restaurant.state}}</p>\n				<hr margin-bottom>\n\n				<!-- <h2>\n					<span ion-text class="fw700">About</span>\n				</h2>\n				<p ion-text margin-bottom>{{ restaurant.description }}</p>\n\n				<h2>\n					<span ion-text class="fw700">Hours</span>\n				</h2>\n				<p ion-text margin-bottom>Open 11AM • Closes 11PM</p>\n\n				<h2>\n					<span ion-text class="fw700">Phone</span>\n				</h2>\n				<p ion-text margin-bottom>+1 (212) 999 0001</p> -->\n\n				<br><br>\n			</div>\n		</div>\n\n  </ion-card>\n\n  <ion-fab bottom right>\n    <button ion-fab round icon-only color="dark" (click)="openCart()">\n      <ion-icon name="cart" class="text-white"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/restaurant-detail/restaurant-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_cart_service_mock__["a" /* CartService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_restaurant_service_mock__["a" /* RestaurantService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_dish_service_mock__["a" /* DishService */],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], RestaurantDetailPage);
    return RestaurantDetailPage;
}());

//# sourceMappingURL=restaurant-detail.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkout_checkout__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cart_service_mock__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CartPage = (function () {
    function CartPage(navCtrl, navParams, storage, cartService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.cartService = cartService;
        this.orders = [];
        this.totalVal = 0;
        this.getOrders();
    }
    CartPage.prototype.removeOrder = function (order) {
        var _this = this;
        this.cartService.removefromCart(order)
            .then(function () {
            _this.getOrders();
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    CartPage.prototype.getOrders = function () {
        var _this = this;
        this.cartService.getOrders().then(function (orders) {
            _this.orders = orders;
            _this.storage.set('orders', _this.orders);
            _this.totalVal = 0;
            _this.orders.forEach(function (val, i) {
                _this.totalVal = _this.totalVal + (val.order.price * val.qtd);
            });
        });
    };
    // minus adult when click minus button
    CartPage.prototype.minusQtd = function (order) {
        var _this = this;
        this.cartService.editQtdOrder(order, 'minus')
            .then(function () {
            _this.getOrders();
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    // plus adult when click plus button
    CartPage.prototype.plusQtd = function (order) {
        var _this = this;
        this.cartService.editQtdOrder(order, 'plus')
            .then(function () {
            _this.getOrders();
        })
            .catch(function (error) { return alert(JSON.stringify(error)); });
    };
    CartPage.prototype.openCheckout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__checkout_checkout__["a" /* CheckoutPage */], { orders: this.orders });
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/cart/cart.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>\n        	<span ion-text>Cart</span>\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content class="lightest-bg">\n  <ion-card *ngIf="!orders.length" class="primary-bg" margin-top>\n    <ion-card-content>\n    	<p text-center class="text-white">You still haven\'t any item.</p>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-list no-margin>\n    <ion-item-sliding *ngFor="let order of orders">\n        <div ion-item>\n        	<!-- (click)="itemTapped(favorite)" -->\n            <ion-thumbnail item-left>\n                <img src="{{order.order.picture}}"/>\n            </ion-thumbnail>\n              <h2 ion-text color="dark" class="fw700">{{order.order.name}}</h2>\n				      <ion-grid class="filters" no-padding>\n				        <ion-row>\n				          <ion-col text-center col-2>\n				            <ion-icon name="remove-circle" class="text-22x" tappable (click)="minusQtd(order)" [hidden]="order.qtd < 2"\n				                      color="secondary"></ion-icon>\n				          </ion-col>\n				          <ion-col text-center col-3>\n				          	<h2 ion-text color="primary" class="text-18x">\n				          		<span>{{ order.qtd }}</span>\n				          	</h2>\n				          </ion-col>\n				          <ion-col text-center col-2>\n				            <ion-icon name="add-circle" class="text-22x" tappable (click)="plusQtd(order)" color="secondary"></ion-icon>\n				          </ion-col>\n				        </ion-row>\n				      </ion-grid>\n            <div item-right>\n							<ion-badge>{{ order.order.price * order.qtd | currency:\'USD\':true }}</ion-badge>\n            </div>\n        </div>\n        <ion-item-options>\n            <button ion-button color="danger" (click)="removeOrder(order)">Delete</button>\n        </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-card class="primary-bg" *ngIf="orders.length">\n    <ion-card-content>\n      <p ion-text color="light">Delivery Tax (30 - 60min): <span class="fw700">FREE</span></p>\n\n			<hr>\n\n      <p ion-text color="light">Total Order Value</p>\n      <h2 ion-text class="text-white fw700">{{ totalVal | currency:\'USD\':true }}</h2>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n\n<ion-footer *ngIf="orders.length" class="no-padding">\n	<button ion-button full large color="dark" no-margin icon-right (click)="openCheckout()">\n		Checkout\n		<ion-icon name="card"></ion-icon>\n	</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/cart/cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_cart_service_mock__["a" /* CartService */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestaurantFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RestaurantFilterPage = (function () {
    function RestaurantFilterPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.radiusmiles = 1;
        this.minmaxprice = {
            upper: 500,
            lower: 10
        };
    }
    RestaurantFilterPage.prototype.closeModal = function () {
        this.navCtrl.pop();
    };
    RestaurantFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-restaurant-filter',template:/*ion-inline-start:"/Users/justinnash/github/standeliver/src/pages/restaurant-filter/restaurant-filter.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons start>\n        <button ion-button round (click)="closeModal()">\n            <ion-icon name="close"></ion-icon>\n        </button>\n    </ion-buttons>\n    <ion-title>\n    	<span ion-text>Search Filter</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item margin-bottom>\n    <ion-label color="primary" stacked>\n    	<span ion-text color="dark" class="fw500">ZipCode Area</span>\n    </ion-label>\n    <ion-input type="number" placeholder="Put your zipcode preference area"></ion-input>\n  </ion-item>\n\n	<ion-item>\n	  <ion-label class="no-margin-bottom">\n	  	<span ion-text color="dark" class="fw500">Radius:</span> <span ion-text color="primary"> {{radiusmiles}} Mile(s)</span></ion-label>\n	  <ion-range min="1" max="50" step="1" value="1" class="no-padding-top" [(ngModel)]="radiusmiles">\n	  </ion-range>\n	</ion-item>\n\n	<ion-item>\n	  <ion-label class="fw500" color="dark">Organize by</ion-label>\n	  <ion-select [(ngModel)]="organizeby">\n	    <ion-option>Most Relevant</ion-option>\n	    <ion-option>Closest</ion-option>\n	    <ion-option>Low Price</ion-option>\n	    <ion-option>High Price</ion-option>\n	    <ion-option>Shorter delivery time</ion-option>\n	    <ion-option>Most rating</ion-option>\n	  </ion-select>\n	</ion-item>\n\n	<ion-item>\n	  <ion-label class="fw500" color="dark">Dish Type</ion-label>\n	  <ion-select [(ngModel)]="dishtype" multiple="true">\n	    <ion-option>Health Food</ion-option>\n	    <ion-option>Veggie</ion-option>\n	    <ion-option>Pasta</ion-option>\n	    <ion-option>Barbecue</ion-option>\n	    <ion-option>Casual Dining</ion-option>\n	    <ion-option>Fine Dining</ion-option>\n	    <ion-option>Street Food</ion-option>\n	    <ion-option>Fast Food</ion-option>\n	    <ion-option>Pizza</ion-option>\n	  </ion-select>\n	</ion-item>\n\n	<ion-item>\n	  <ion-label class="fw500" color="dark">Nationalities</ion-label>\n	  <ion-select [(ngModel)]="dishnationality" multiple="true">\n	    <ion-option>German</ion-option>\n	    <ion-option>Japanese</ion-option>\n	    <ion-option>Korean</ion-option>\n	    <ion-option>Indian</ion-option>\n	    <ion-option>Arabian</ion-option>\n	    <ion-option>Italian</ion-option>\n	    <ion-option>Chinese</ion-option>\n	    <ion-option>Brazilian</ion-option>\n	    <ion-option>Thai</ion-option>\n	  </ion-select>\n	</ion-item>\n\n	<ion-item margin-bottom>\n	  <ion-label class="no-margin-bottom">\n	  	<span ion-text color="dark" class="fw500">Min/Max Price:</span> <span ion-text color="primary"> $ {{minmaxprice.lower}} to $ {{minmaxprice.upper}}</span></ion-label>\n	  	<ion-range dualKnobs="true" [(ngModel)]="minmaxprice" min="10" max="1000" step="10" class="no-padding-top"></ion-range>\n	</ion-item>\n\n	<button ion-button block color="primary" (click)="closeModal()">Filter Results</button>\n</ion-content>\n'/*ion-inline-end:"/Users/justinnash/github/standeliver/src/pages/restaurant-filter/restaurant-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], RestaurantFilterPage);
    return RestaurantFilterPage;
}());

//# sourceMappingURL=restaurant-filter.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// import restaurants from './mock-restaurants';
var CartService = (function () {
    function CartService() {
        this.orderCounter = 0;
        this.orders = [];
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
    CartService.prototype.addtoCart = function (order, qtd) {
        this.orderCounter = this.orderCounter + 1;
        this.orders.push({
            id: this.orderCounter,
            order: order,
            qtd: qtd,
            restaurant: sessionStorage.getItem('restaurant')
        });
        return Promise.resolve();
    };
    CartService.prototype.getOrders = function () {
        return Promise.resolve(this.orders);
    };
    CartService.prototype.removefromCart = function (order) {
        var index = this.orders.indexOf(order);
        if (index > -1) {
            this.orders.splice(index, 1);
        }
        return Promise.resolve();
    };
    CartService.prototype.editQtdOrder = function (order, op) {
        // let order = this.orders[id - 1]
        // let index = this.orders.indexOf(order);
        // let order;
        //   if (index > -1) {
        //     this.orders[index];
        //   }
        for (var i in this.orders) {
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
        return Promise.resolve();
    };
    CartService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CartService);
    return CartService;
}());

//# sourceMappingURL=cart-service-mock.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DishService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_dishes__ = __webpack_require__(521);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DishService = (function () {
    function DishService() {
    }
    DishService.prototype.findAll = function () {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_dishes__["a" /* default */]);
    };
    DishService.prototype.findById = function (id) {
        return Promise.resolve(__WEBPACK_IMPORTED_MODULE_1__mock_dishes__["a" /* default */][id - 1]);
    };
    DishService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], DishService);
    return DishService;
}());

//# sourceMappingURL=dish-service-mock.js.map

/***/ })

},[316]);
//# sourceMappingURL=main.js.map