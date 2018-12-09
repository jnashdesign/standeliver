import {Component} from "@angular/core";
import {NavController, ViewController} from "ionic-angular";

import {MessageListPage} from '../message-list/message-list'
import { AngularFireDatabase } from "angularfire2/database";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {

  messages: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public afd: AngularFireDatabase,
    public storage: Storage,
    public viewCtrl: ViewController) {}

    ionViewWillLoad(){
      this.getMessages();
    }

  close() {
    this.viewCtrl.dismiss();
  }

  goToMessages () {
  	this.navCtrl.push(MessageListPage);
  }

  getMessages() {
    this.afd.list('/users/'+ localStorage.getItem('userID') + '/messages/')
        .valueChanges().subscribe((data) => {
        this.messages = data;
        console.log('messages: '+this.messages);
    },
    (err)=>{ 
        console.log("problem : ", err)
    })
}
}
