import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignupPage} from "../signup/signup";
import {PasswordresetPage} from "../passwordreset/passwordreset";
import {AuthService} from "../../providers/services/auth.services";
import {TabsPage} from "../tabs/tabs";
import {GooglePlus} from "@ionic-native/google-plus";
import * as firebase from "firebase/app";
import {UserProvider} from "../../providers/user/user";
import {AngularFireAuth} from "angularfire2/auth";

/* * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.*/


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup;
  loginError: string;
  userProfile: any = null;
  newuser = {
    email: '',
    password: '',
    displayName: '',
    photoUrl: ''
  };

  firedata = firebase.database().ref('/users');
  constructor(public googleplus: GooglePlus,
              private navCtrl: NavController,
              private auth: AuthService,
              public user: UserProvider,
              public afireauth: AngularFireAuth,
              fb: FormBuilder) {

    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });
  }

  login() {
    let data = this.form.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(TabsPage),
        error => this.loginError = error.message
      );
  }


 /*   loginWithFacebook() {
      this.auth.signInWithFacebook()
        .then(
          () => this.navCtrl.setRoot(LightPage),
          error => console.log(error.message)
        );
    }
*/


  onSignInWithGoogle() {
    this.user.signInWithGoogle(this.newuser);
    if(this.user.isAuthenticated()) {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: 'Trekkie',
        photoURL: this.user.getRandomImg(this.user.randomImg)
      }).then(() => {
        this.firedata.child(this.afireauth.auth.currentUser.uid).set({
          uid: this.afireauth.auth.currentUser.uid,
          displayName: 'Trekkie',
          photoURL: this.user.getRandomImg(this.user.randomImg)
        })
      });
    }

    this.navCtrl.setRoot(TabsPage)
  }

 /*   loginWithTwitter() {
      this.auth.signInWithTwitter()
        .then(
          () => this.navCtrl.setRoot(LightPage),
          error => console.log(error.message)
        );
    }*/

  signup() {
    this.navCtrl.push(SignupPage);
  }

  resetPassword() {
    this.navCtrl.push(PasswordresetPage);
  }





}

