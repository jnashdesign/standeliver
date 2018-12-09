import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthPage} from '../../pages/auth/auth';
import {Storage} from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'page-my-account',
    templateUrl: 'my-account.html'
})
export class MyAccountPage {

  profiledata: Boolean = true;
  userData: any;
  username: String;
  status: String;
  email: String;

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public afd: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public storage: Storage,
    public toastCtrl: ToastController) {
      this.userData;
      this.email;
      this.username;
      this.status;
      this.getUserData();
  }

  // process send button
  sendData() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profiles-bg',
      message: 'Your Data was Edited!',
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.navCtrl.setRoot(HomePage);
    }, 3000)
  }

  getUserData(){
    this.afd.object('/users/' + localStorage.getItem('userID'))
    .valueChanges().subscribe((data) => {
      this.userData = data;
      this.email = this.userData.email;
      this.username = this.userData.name;
      this.status = this.userData.status;
      console.log(this.userData);
    },
    (err)=>{ 
      console.log("problem : ", err)
    })
  }

  logout() {
    localStorage.clear();
    this.storage.clear();
    this.navCtrl.setRoot(AuthPage);
  }

}
