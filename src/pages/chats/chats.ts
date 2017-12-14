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
              //Events is a publish-subscribe
              // style event system for sending and responding
              // to application-level events across your app.
              public alertCtrl: AlertController,
              public chatservice: ChatProvider) {}

  ionViewWillEnter() { // call when we enter to this page
    this.requestservice.getmyrequests(); // this will get our request
    this.requestservice.getmyfriends(); // this will get our friends
    this.events.subscribe('gotrequests', () => { // we print this request and thos will be showed in the array
      this.myrequests = []; // in this array
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  addbuddy() { // this is to add the buddy so we add this function to send the user to the page buddiesPage
    this.navCtrl.push('BuddiesPage');
  }

  // i think this item is the request we are sending inside the requestservices
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
