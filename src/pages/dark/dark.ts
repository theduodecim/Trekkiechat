import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dark',
  templateUrl: 'dark.html',
})
export class DarkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DarkPage');
  }

  addbuddy() { // this is to add the buddy so we add this function to send the user to the page buddiesPage
    this.navCtrl.push('ChatsPage');
  }


}
