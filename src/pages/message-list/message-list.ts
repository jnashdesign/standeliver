import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {MessageService} from '../../providers/message-service-mock';
import {MessageDetailPage} from '../message-detail/message-detail';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'page-message-list',
    templateUrl: 'message-list.html'
})
export class MessageListPage {

    messages: Array<any> = [];

    constructor(
        public navCtrl: NavController,
        public afd: AngularFireDatabase, 
        public service: MessageService){}

    ionViewWillLoad(){
        this.getMessages();
    }

    itemTapped(message) {
        // console.log('itemTapped: ', message);
        this.navCtrl.push(MessageDetailPage, message);
    }

    deleteItem(message) {
        this.service.delMessage(message)
            .then(() => {
                this.getMessages();
                // console.log('deleteItem: ', this.messages)
            })
            .catch(error => alert(JSON.stringify(error)));
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
