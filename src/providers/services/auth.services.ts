import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  getName() {
    return this.user && (this.user.displayName || this.getUsername());
  }

  getUsername() {
    let email = this.getEmail() || '';
    let indexOfAt = email.indexOf('@');
    return indexOfAt > 0 ? email.substring(0, indexOfAt) : 'Anonymous';
  }

  getEmail() {
    return this.user && this.user.email;
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : '';
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signInWithGitHub(): Promise<any> {
    console.log('Sign in with git hub');
    return this.oauthSignIn(new firebase.auth.GithubAuthProvider());
  }

  signInWithFacebook() {
    console.log('Sign in with facebook');
    return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  signInWithTwitter() {
    console.log('Sign in with twitter');
    return this.oauthSignIn(new firebase.auth.TwitterAuthProvider());
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then( result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function(error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
  }
}
