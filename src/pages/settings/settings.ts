import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AuthPage} from '../../pages/auth/auth';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public nav: NavController) {
  }

  // logout
  logout() {
    localStorage.clear();
    this.nav.setRoot(AuthPage);
  }
}