import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController,
  NavParams,
  Events,
  Content,
  LoadingController } from 'ionic-angular'; //loading controller to show the loading animation
import { ChatProvider } from '../../providers/chat/chat';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import firebase from 'firebase';
/**
 * Generated class for the BuddychatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})
export class BuddychatPage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  imgornot; // this will convert our image in a image without this will be only an string
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chatservice: ChatProvider,
              public events: Events,
              public zone: NgZone,
              public loadingCtrl: LoadingController,
              public imgstore: ImghandlerProvider) {

    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.imgornot = []; // part 4 if this message will be display like an img
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
        for (let key in this.allmessages) { // let
          if (this.allmessages[key].message.substring(0, 4) == 'http') //here we are checking if the message are sendding are images
            this.imgornot.push(true); // if they are will push in this case will show thos images
          else
            this.imgornot.push(false); // if not this will not run
        }
      })


    })
  }

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';  //?
    })
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  sendPicMsg() { // adding this image to send like a normal message part 3
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => { // here we load the img
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() => { // and here we send that img
        this.scrollto();
        this.newmessage = ''; // this will be added like a string
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }
}
