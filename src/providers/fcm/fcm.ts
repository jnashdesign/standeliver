import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afd: AngularFireDatabase,
    private platform: Platform) {
  }

  async getToken(){
    let token; 

    if (this.platform.is('android')){
      token = await this.firebaseNative.getToken();
      localStorage.setItem('token',token);
    }
    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
      localStorage.setItem('token',token);
      console.log(token);
    }
  }

}
