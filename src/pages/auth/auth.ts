import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController, AlertController, ToastController, MenuController, LoadingController, ModalController} from "ionic-angular";
import { AngularFireDatabase } from 'angularfire2/database';
import {HomePage} from "../home/home";
import { AngularFireAuth } from 'angularfire2/auth';
// import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage implements OnInit {
  public onLoginForm: FormGroup;
  public onRegisterForm: FormGroup;
  auth: string = "login";
  loading: any;

  constructor(
    private _fb: FormBuilder,
    public afd: AngularFireDatabase,
    public nav: NavController, 
    public forgotCtrl: AlertController, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public afAuth: AngularFireAuth) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.onRegisterForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  signupUser() {
    if (this.onRegisterForm.valid) {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.afAuth.auth.createUserWithEmailAndPassword(
        this.onRegisterForm.value.email, 
        this.onRegisterForm.value.password)
        .then(newUser => {
          localStorage.setItem('userID', newUser.user.uid);
          localStorage.setItem('username',name);
          localStorage.setItem('loggedIn','true');
          this.navCtrl.setRoot(HomePage);
          this.afd.list('/users').update(
            newUser.user.uid, 
            {
              email: newUser.user.email,
              messages:
                {
                  "date" : "2017-11-01T00:00:00.000-0300",
                  "email" : "info@standeliver.com",
                  "id" : 1,
                  "message" : "Welcome to the app!",
                  "read" : false,
                  "senderId" : 1,
                  "senderName" : "Standeliver",
                  "title" : "Welcome!"
                }
            }
            );
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
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
  }

  
    login(): void {  
      if (this.onLoginForm.valid) {
        this.afAuth.auth.signInWithEmailAndPassword(
          this.onLoginForm.value.email, 
          this.onLoginForm.value.password)
          .then(authData => {
            console.log(JSON.stringify(authData));
            console.log(this.afd.list('/restaurants'));

            localStorage.setItem('userEmail', authData.user.email);
            localStorage.setItem('userName', authData.user.displayName);
            localStorage.setItem('userID', authData.user.uid);
            localStorage.setItem('loggedIn','true');
            this.navCtrl.setRoot(HomePage);
            }, error => {
              let alert = this.alertCtrl.create({
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
          })
        }
    }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
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
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
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
  }

}
