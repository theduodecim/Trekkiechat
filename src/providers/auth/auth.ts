/*
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';
import * as firebase from 'firebase/app';
/!*
  Generated class for the AuthProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*!/
@Injectable()
export class AuthProvider {
  private user: firebase.User;

  constructor(public afireauth: AngularFireAuth) {
    afireauth.authState.subscribe(user => {
      this.user = user;
    });
  }

  /!*
      For logging in a particular user. Called from the login.ts file.

  *!/

  login(credentials: usercreds) {
    let promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  getName() {
    return this.user && (this.user.displayName || this.getUsername());
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  getUsername() {
    let email = this.getEmail() || '';
    let indexOfAt = email.indexOf('@');
    return indexOfAt > 0 ? email.substring(0, indexOfAt) : 'Anonymous';
  }

  getEmail() {
    return this.user && this.user.email;
  }


}
*/
