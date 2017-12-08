import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WookiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wookie',
  templateUrl: 'wookie.html',
})
export class WookiePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WookiePage');
  }

  addbuddy() { // this is to add the buddy so we add this function to send the user to the page buddiesPage
    this.navCtrl.push('ChatsPage');
  }

}
