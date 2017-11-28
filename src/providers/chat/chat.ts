/*import { HttpClient } from '@angular/common/http';*/
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Events} from "ionic-angular";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider { //episode 8
  buddy: any; // dont forget
  firebuddychats = firebase.database().ref('/buddychats');
  buddymessages = [];
  constructor(public events: Events) {
    console.log('Hello ChatProvider Provider');
  }

  initializebuddy(buddy) {
    this.buddy = buddy;
  }
  addnewmessage(msg) {
    if (this.buddy) {
      let promise = new Promise((resolve, reject) => { //let
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
          })/*.catch((err) => {
            reject(err);
          })*/
        })
      })
      return promise;
    }
  }

  getbuddymessages() {
    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (let tempkey in temp) { // let
        this.buddymessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
