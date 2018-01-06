import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
/*
import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from "firebase";*/
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignupPage} from "../signup/signup";
import {PasswordresetPage} from "../passwordreset/passwordreset";
import {AuthService} from "../../providers/services/auth.services";
import {TabsPage} from "../tabs/tabs";
import {GooglePlus} from "@ionic-native/google-plus";
import * as firebase from "firebase/app";
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 /* credentials = {} as usercreds;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authservice: AuthProvider) {
  }*/
  form: FormGroup;
  loginError: string;
  fireauth = firebase.auth();
  userProfile: any = null;
  constructor(
    public googleplus: GooglePlus,
    private navCtrl: NavController,
    private auth: AuthService,
    fb: FormBuilder
  ) {

    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
   firebase.auth().onAuthStateChanged( user => {
      if (user){
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


/*
  loginWithFacebook() {
    this.auth.signInWithFacebook()
      .then(
        () => this.navCtrl.setRoot(LightPage),
        error => console.log(error.message)
      );
  }*/



  signInWithGoogle() {
    this.googleplus.login({
      'webClientId': '73724290118-et73usq9p6hi21emsrqpgqr64hoglimg.apps.googleusercontent.com',
    }).then( (res) => {
      const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      this.fireauth.signInWithCredential(firecreds).then(() => {
        this.navCtrl.setRoot(TabsPage);
      }).catch((err) => {
        alert('Auth Failed' + err)
      })
    }).catch((err) => {
      alert('Error' + err);
    })
    }

/*
  loginWithTwitter() {
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








































  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot('TabsPage');
      else
        alert(res);
    })
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage'); // parent known why? search
    })
  }
  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }*/
}
