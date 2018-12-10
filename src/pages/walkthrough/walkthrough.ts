import { Component, ViewChild } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';

import {AuthPage} from '../auth/auth';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html',
})
export class WalkthroughPage {
	@ViewChild(Slides) slides: Slides;
  showSkip = true;
  dir: string = 'ltr';

  slideList: Array<any> = [
    {
      title: "What is Stan<strong>deliver</strong>?",
      description: "It is an app that makes sure you never miss a moment of a great game.",
      image: "assets/img/standeliver.png",
    },
    {
      title: "Why should I use it?",
      description: "You can order your food and we will deliver it right to your seat.",
      image: "assets/img/phone.png",
    },
    {
      title: "Never fight the crowds again.",
      description: "No one likes standing in line waiting for food. Let us handle it for you.",
      image: "assets/img/crowd.png",
    }
  ];

  constructor(public navCtrl: NavController) {
  }

  onSlideNext() {
    this.slides.slideNext(300)
  }

	onSlidePrev() {
    this.slides.slidePrev(300)
  }

  onLastSlide() {
  	this.slides.slideTo(3, 300)
  }

  openHomePage() {
  	this.navCtrl.setRoot(HomePage);
  }

  openAuthPage() {
    this.navCtrl.setRoot(AuthPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkthroughPage');
  }

  ionViewWillEnter(){
    if (localStorage.getItem('loggedIn') == 'true'){
      this.navCtrl.setRoot(HomePage);
    }
  }

}
