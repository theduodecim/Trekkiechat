import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users'); //reference for the user data base
  constructor(public afireauth: AngularFireAuth) {
  }

  /*
  Adds a new user to the system.

  Called from - signup.ts
  Inputs - The new user object containing the email, password and displayName.
  Outputs - Promise.

   */

  adduser(newuser) {
    let promise = new Promise((resolve, reject) => { // let
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  /*

  For resetting the password of the user.
  Called from - passwordreset.ts
  Inputs - email of the user.
  Output - Promise.

   */

  passwordreset(email) {
    let promise = new Promise((resolve, reject) => { // let
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  /*

  For updating the users collection and the firebase users list with
  the imageurl of the profile picture stored in firebase storage.

   Called from - profilepic.ts
  Inputs - Url of the image stored in firebase.
  OUtputs - Promise.
  */

 updateimage(imageurl) {
    let promise = new Promise((resolve, reject) => { // let
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  //this is how to acces to particular key (node of users) to get thos values of the firebase database
  getuserdetails() {
    let promise = new Promise((resolve, reject) => { // let
      this.firedata.child(firebase.auth().currentUser.uid) // reference for the user data base
        .once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updatedisplayname(newname) {  // updated the display name
    let promise = new Promise((resolve, reject) => { // let
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL,
          uid: this.afireauth.auth.currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }




// this functions is to show all the users to choose one we are needed  https://firebase.google.com/docs/auth/web/manage-users
  getallusers() {
  let promise = new Promise((resolve, reject) => { //let
    this.firedata.orderByChild('uid').once('value', (snapshot) => {
      let userdata = snapshot.val();
      let temparr = [];
      for (let key in userdata) { // let
        temparr.push(userdata[key]);
      }
      resolve(temparr);
    }).catch((err) => {
      reject(err);
    })
  })
  return promise;
}

}
