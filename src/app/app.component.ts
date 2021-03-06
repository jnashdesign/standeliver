import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AuthPage} from '../pages/auth/auth';
import {WalkthroughPage} from '../pages/walkthrough/walkthrough';
import {HomePage} from '../pages/home/home';
import {MyAccountPage} from '../pages/my-account/my-account';
import {RestaurantListPage} from '../pages/restaurant-list/restaurant-list';
import {ItemListPage} from '../pages/item-list/item-list';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {AboutPage} from '../pages/about/about';
import {SupportPage} from '../pages/support/support';
import {MessageListPage} from '../pages/message-list/message-list';
import {YourRestaurantPage} from '../pages/your-restaurant/your-restaurant';
import {SettingsPage} from '../pages/settings/settings';
import {NearbyPage} from '../pages/nearby/nearby';
import {CategoryPage} from '../pages/category/category';
import {OrdersPage} from '../pages/orders/orders';
import {CartPage} from '../pages/cart/cart';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = WalkthroughPage;
    homeItem: any;
    initialItem: any;
    messagesItem: any;
    settingsItem: any;
    appMenuItems: Array<MenuItem>;
    yourRestaurantMenuItems: Array<MenuItem>;
    accountMenuItems: Array<MenuItem>;
    helpMenuItems: Array<MenuItem>;
    name: String;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen) {
        this.initializeApp();

        this.homeItem = { component: HomePage };
        this.messagesItem = { component: MessageListPage};

        this.appMenuItems = [
            // {title: 'Restaurants', component: RestaurantListPage, icon: 'home'},
            // {title: 'Item List', component: ItemListPage, icon: 'pizza'},
            // {title: 'Nearby', component: NearbyPage, icon: 'compass'},
            // {title: 'By Category', component: CategoryPage, icon: 'albums'},
            {title: 'Past Orders', component: OrdersPage, icon: 'list-box'},
            {title: 'Cart', component: CartPage, icon: 'cart'},
            {title: 'Favorite Restaurants', component: FavoriteListPage, icon: 'heart'}
        ];

        // this.yourRestaurantMenuItems = [
        //     {title: 'Register Restaurant', component: YourRestaurantPage, icon: 'clipboard'}
        // ];


        this.accountMenuItems = [
            {title: 'Login', component: AuthPage, icon: 'log-in'},
            {title: 'My Account', component: MyAccountPage, icon: 'contact'},
            // {title: 'Logout', component: AuthPage, icon: 'log-out'},
        ];

        this.helpMenuItems = [
            {title: 'About', component: AboutPage, icon: 'information-circle'},
            {title: 'Support', component: SupportPage, icon: 'call'},
            // {title: 'App Settings', component: SettingsPage, icon: 'cog'},
            {title: 'Walkthrough', component: WalkthroughPage, icon: 'photos'}
        ];

        this.name = localStorage.getItem('userEmail');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#000000');
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
