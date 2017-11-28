import { Injectable } from '@angular/core';
import { connreq } from '../../models/interfaces/request';
import firebase from 'firebase';
import {UserProvider} from "../user/user";
import {Events} from "ionic-angular";

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  userdetails;
  myfriends;
  firefriends = firebase.database().ref('/friends');
  constructor(public userservice: UserProvider, public events: Events) {

  }

  sendrequest(req: connreq) {
    let promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve({ success: true });
      })/*.catch((err) => {  check this
        resolve(err);
      })*/
    })
    return promise;
  }

  getmyrequests() {
    let allmyrequests;
    let myrequests = []; // let
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (let i in allmyrequests) {  //let
        myrequests.push(allmyrequests[i].sender);
      }
      this.userservice.getallusers().then((res) => {
        let allusers = res;  // let
        this.userdetails = [];
        for (let j in myrequests) // let
          for (let key in allusers) { // let
            if (myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })

    })
  }

  acceptrequest(buddy) {
    let promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then(() => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleterequest(buddy).then(() => {
            resolve(true);
          })
        })
      })
       /* }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })*/
    })
    return promise;
  }

  deleterequest(buddy) { //ep 7
    let promise = new Promise((resolve, reject) => { // let
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
        let somekey;
        for (let key in snapshot.val()) // let
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
      })
        .then(() => {

        }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
  getmyfriends() {
    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for (let i in allfriends) // let
        friendsuid.push(allfriends[i].uid);

      this.userservice.getallusers().then((users) => {
        this.myfriends = [];
        for (let j in friendsuid) // let
          for (let key in users) { // let
            if (friendsuid[j] === users[key].uid) {
              this.myfriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })

    })
  }

}
