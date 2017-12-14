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
import {LightPage} from "../light/light";

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
  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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
        () => this.navCtrl.setRoot(LightPage),
        error => this.loginError = error.message
      );
  }



  loginWithFacebook() {
    this.auth.signInWithFacebook()
      .then(
        () => this.navCtrl.setRoot(LightPage),
        error => console.log(error.message)
      );
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.navCtrl.setRoot(LightPage),
        error => console.log(error.message)
      );
  }

  loginWithTwitter() {
    this.auth.signInWithTwitter()
      .then(
        () => this.navCtrl.setRoot(LightPage),
        error => console.log(error.message)
      );
  }

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
