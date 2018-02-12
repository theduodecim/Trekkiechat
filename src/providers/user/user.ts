import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import {GooglePlus} from "@ionic-native/google-plus";
import {OneSignal} from "@ionic-native/onesignal";
import {Platform} from "ionic-angular";
import {AuthService} from "../services/auth.services";
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable() //Remember this is for add providers to our provider
export class UserProvider {
  fireauth = firebase.auth();
  firedata = firebase.database().ref('/users');
  onesignalDeviceId = firebase.database().ref('users/');//reference for the user data base
  storetokens = firebase.database().ref('/token');
  token: string;
  randomImg = [
    'http://i63.tinypic.com/2ngc56p.jpg',
    'http://i64.tinypic.com/m9my4g.jpg',
    'http://i68.tinypic.com/2yxk9kk.jpg',
    'http://i64.tinypic.com/2pq5i75.jpg',
    'http://i66.tinypic.com/16gh6hl.jpg',
    'http://i64.tinypic.com/2igf9z7.jpg',
    'http://i67.tinypic.com/hs6jnm.jpg',
    'http://i66.tinypic.com/xc2bll.jpg',
    'http://i64.tinypic.com/345h3ky.jpg',
    'http://i66.tinypic.com/vnz0gp.jpg',
  ];
  selectedImgArray = [];
  constructor(public afireauth: AngularFireAuth, public googleplus: GooglePlus, public one: OneSignal, public platform: Platform, public auth: AuthService) {}

  public selectedImg() {
    for(let i=0; i<8; i++) { // for loop para ir contando entre el index de cada objeto
      // Get a random IMG from that list
      let randomImg = this.getRandomImg(this.selectedImgArray); // creamos una variable local dentro de selectedImg function
      // push the the final object to the random IMG
      this.selectedImgArray.push(randomImg); // esto quita los otros links y mete el link q seleciono de forma aleatoria dentro de nuestra random Img
    }
  }
  public getRandomImg(randomImg) {
    let randomIndex = Math.floor((Math.random() * this.randomImg.length) );
    return this.randomImg[randomIndex];
  }
  /*
  Adds a new user to the system.

  Called from - signup.ts
  Inputs - The new user object containing the email, password and displayName.
  Outputs - Promise.

   */



  adduser(newuser) {
    let promise = new Promise((resolve, reject) => { // let
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => { // pasa email and password
        firebase.auth().currentUser.getToken()
          .then(
            (token: string) => this.token = token // with the user value we convert it in a token
          )
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: this.getRandomImg(this.randomImg)
        }).then(() => {
          this.onesignalDeviceId.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: this.getRandomImg(this.randomImg)
          })/*.then(() => {
            if (this.platform.is('cordova')) {
              //Get the Id
              this.one.getIds().then(success => {
                //Update  the database with onesignal_ID
                this.onesignalDeviceId.update({
                  onesignal_ID: success.userId
                })
              })

            } else {
              this.firedata.update({
                onesignal_ID: '73724290118'
              });
            }
          })*/.then(() => {
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



  signInWithGoogle(newuser) {
    this.googleplus.login({
      'webClientId': '73724290118-et73usq9p6hi21emsrqpgqr64hoglimg.apps.googleusercontent.com',
    }).then( (res) => {
      const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken); // esta tomando esas credenciales para logearce, credentials es para pasar el tocken
      this.fireauth.signInWithCredential(firecreds).then(() => { // toma las credenciales de google para pasarlas a firebase
        // pasa email and password
        // simpre va a tener las credenciales porq las toma de google lo que necesito es
            firebase.auth().currentUser.getToken()
              .then(
                (token: string) => this.token = token // with the user value we convert it in a token
              )
          }
        )
      }).catch((err) => {
        alert('Auth Failed' + err)
      }).catch((err) => {
      alert('Error' + err);
    })
  }

  isAuthenticated() {
    return this.token != null;
  }


  getToken() {  // check
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token
  }

  logout() {// to know the user is logout we need to tell to our backend

    //save the token in firebase?
    /*  const token =  this.getToken();
    this.storetokens.set({
      token: token
    }).then(() => {*/
      firebase.auth().signOut().then(() => {
        this.googleplus.logout()// this sent to the login page with the navcrl
      })
  /*  })*/
  }




// bueno calm down una de las posibilidades es tomar el token




  /*getRecipes() {
    const token = this.getToken()
      .map(
        (response: Response) => {
          const recipes: newuser2[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
  }*/






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
          resolve(snapshot.val())
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

  getallpcitures() {
    let promise = new Promise((resolve, reject) => { //let
      this.firedata.orderByChild('photoURL').once('value', (snapshot) => {
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
