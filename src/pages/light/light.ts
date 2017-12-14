import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {DataService} from "../../providers/services/data.services";
import {AngularFireList} from "angularfire2/database";
import {FirebaseListObservable} from "angularfire2/database-deprecated";

/**
 * Generated class for the LightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-light',
  templateUrl: 'light.html',
})

export class LightPage {
  item: any;
  messages$: AngularFireList<any[]>;
  placeholderText: string = 'Enter a message';

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public data: DataService) {
               this.item = navParams.get('item');
               this.messages$ = data.getChatMessages(this.item.$key);
               this.setPlaceholder(auth);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LightPage');
  }

  addbuddy() { // this is to add the buddy so we add this function to send the user to the page buddiesPage
    this.navCtrl.push('ChatsPage');
  }

  send(message: string) {
    this.messages$.push({
      createdAt: new Date().getTime(),
      from: this.auth.getName(),
      text: message
    });
  }

  setPlaceholder(auth) {
    if (!auth.authenticated) {
      this.placeholderText = 'Please, login to post a message';
    }
  }


}
