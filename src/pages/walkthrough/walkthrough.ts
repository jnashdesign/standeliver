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

}
