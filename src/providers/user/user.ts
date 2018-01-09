import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import {GooglePlus} from "@ionic-native/google-plus";
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable() //Remember this is for add providers to our provider
export class UserProvider {
  fireauth = firebase.auth();
  firedata = firebase.database().ref('/users'); //reference for the user data base
  token: string;
  randomImg = [
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/wokie.jpg?alt=media&token=4333659b-8ee8-4850-8ce3-a12f30ab1762',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/yoda.jpg?alt=media&token=324dcf30-11a1-4929-9c22-5128e8f27443',
    'https://firebasestorage.googleapis.com/v0/b/trekkiechat.appspot.com/o/star-wars-1386790_960_720.png?alt=media&token=3cf643d3-acf1-4a54-a423-7030746c4dca'
  ];
  selectedImgArray = [];
  constructor(public afireauth: AngularFireAuth, public googleplus: GooglePlus) {}

  public selectedImg() {
    for(let i=0; i<4; i++) { // for loop para ir contando entre el index de cada objeto
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
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: this.getRandomImg(this.randomImg)
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: this.getRandomImg(this.randomImg)
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
      this.fireauth.signInWithCredential(firecreds).then(() => { // esta logeandoce
        // pasa email and password
        this.afireauth.auth.currentUser.updateProfile({
          displayName: 'Trekkie',
          photoURL: this.getRandomImg(this.randomImg)
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: 'Trekkie',
            photoURL: this.getRandomImg(this.randomImg)
          })
        })
      }).catch((err) => {
        alert('Auth Failed' + err)
      })
    }).catch((err) => {
      alert('Error' + err);
    })
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

  getToken() {  // check
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token
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
