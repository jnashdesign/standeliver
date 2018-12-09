import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Storage} from '@ionic/storage';

@Injectable()
export class MessageService {

  messageCounter: number = 0;
  messages: any;
  constructor(
    public afd: AngularFireDatabase,
    public storage: Storage
  ) {
    this.messages = this.storage.get('messages');
  }

  findById(id) {
    console.log(id)
    return Promise.resolve(this.messages[id - 1]);
  }

  message(message) {
    this.messageCounter = this.messageCounter + 1;
    this.messages.push({id: this.messageCounter, message: message});
    return Promise.resolve();
  }

  delMessage(message) {
    let index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
    return Promise.resolve();
  }

}
