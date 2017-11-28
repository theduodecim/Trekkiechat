import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";
import {ChatProvider} from "../../providers/chat/chat";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestservice: RequestsProvider,
              public events: Events,
              public alertCtrl: AlertController,
              public chatservice: ChatProvider) {
  }

  ionViewWillEnter() { // theory in the ep6
    this.requestservice.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }

  addbuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  accept(item) {  //ep 7
    this.requestservice.acceptrequest(item).then(() => {

      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on the friend to chat with him',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {
      alert('Request ignored');
    }).catch((err) => {
      alert(err);
    })
  }

  buddychat(buddy) { // ep 8
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }



}
