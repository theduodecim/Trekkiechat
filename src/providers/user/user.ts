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
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2F6191456450_e15c906b8f_z.jpg?alt=media&token=3689cde4-064d-41a4-a9a3-b58db96e35e6',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2FDisney-logo%20(1).jpg?alt=media&token=2a6ed1a7-7914-45a6-831d-f5dac51ad8ca',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2FKylo_Ren_cosplayer_(22969075254).jpg?alt=media&token=d268b288-0958-4e23-b770-5a1490488631',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2Fstar-wars-1386790_960_720.png?alt=media&token=77fd695d-7ebf-4eeb-beea-e4a6e6fb09cd',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2Fwokie.jpg?alt=media&token=bb10918e-9e9e-40f3-b9db-6ba83271b1ab',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2FWondercon_2016_-_Rey_Cosplay_(26014546051)%20(1).jpg?alt=media&token=4de7f769-902c-4aa2-8dde-264206b1f864',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2Fyoda.jpg?alt=media&token=67952aa6-4edc-45f1-bc12-aff0a4bad793',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/UsersPicProfile%2FSWCA_-_Kenny_Baker_model_(17202872135).jpg?alt=media&token=7b352120-d72b-46b1-94a4-5032b1ef4625'
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

          }).then(() => {
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



}
