import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import {AuthPage} from '../pages/auth/auth';
import {WalkthroughPage} from '../pages/walkthrough/walkthrough';
import {HomePage} from '../pages/home/home';
import {NearbyPage} from '../pages/nearby/nearby';
import {MyAccountPage} from '../pages/my-account/my-account';
import {SettingsPage} from '../pages/settings/settings';
import {RestaurantListPage} from '../pages/restaurant-list/restaurant-list';
import {RestaurantFilterPage} from '../pages/restaurant-filter/restaurant-filter';
import {RestaurantDetailPage} from '../pages/restaurant-detail/restaurant-detail';
import {DishListPage} from '../pages/dish-list/dish-list';
import {DishDetailPage} from '../pages/dish-detail/dish-detail';
import {CategoryPage} from '../pages/category/category';
import {CartPage} from '../pages/cart/cart';
import {CheckoutPage} from '../pages/checkout/checkout';
import {OrdersPage} from '../pages/orders/orders';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {AboutPage} from '../pages/about/about';
import {SupportPage} from '../pages/support/support';
import {NotificationsPage} from '../pages/notifications/notifications';
import {MessageListPage} from '../pages/message-list/message-list';
import {MessageDetailPage} from '../pages/message-detail/message-detail';
import {YourRestaurantPage} from '../pages/your-restaurant/your-restaurant';
import { PipesModule } from '../pipes/pipes.module';
import {MessageService} from "../providers/message-service-mock";
import {RestaurantService} from "../providers/restaurant-service-mock";
import {DishService} from "../providers/dish-service-mock";
import {CategoryService} from "../providers/category-service-mock";
import {CartService} from "../providers/cart-service-mock";
import {OrdersService} from "../providers/orders-service-mock";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyCHBfOtN1SSd5oaVxk_UjthNnrYK1cGLM8",
    authDomain: "standeliver-prototype.firebaseapp.com",
    databaseURL: "https://standeliver-prototype.firebaseio.com",
    projectId: "standeliver-prototype",
    storageBucket: "standeliver-prototype.appspot.com",
    messagingSenderId: "268248628178"
};

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    WalkthroughPage,
    HomePage,
    NearbyPage,
    MyAccountPage,
    SettingsPage,
    AboutPage,
    SupportPage,
    RestaurantListPage,
    RestaurantFilterPage,
    RestaurantDetailPage,
    FavoriteListPage,
    DishListPage,
    DishDetailPage,
    CategoryPage,
    NotificationsPage,
    MessageListPage,
    MessageDetailPage,
    YourRestaurantPage,
    CartPage,
    CheckoutPage,
    OrdersPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__foodIonicDB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    PipesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    WalkthroughPage,
    HomePage,
    NearbyPage,
    MyAccountPage,
    SettingsPage,
    AboutPage,
    SupportPage,
    RestaurantListPage,
    RestaurantFilterPage,
    RestaurantDetailPage,
    FavoriteListPage,
    DishListPage,
    DishDetailPage,
    CategoryPage,
    NotificationsPage,
    MessageListPage,
    MessageDetailPage,
    YourRestaurantPage,
    CartPage,
    CheckoutPage,
    OrdersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    RestaurantService,
    DishService,
    CategoryService,
    MessageService,
    CartService,
    OrdersService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
