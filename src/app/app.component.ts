import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {OneSignal} from "@ionic-native/onesignal";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  pages;

  constructor( public platform: Platform, public  statusBar: StatusBar, public splashScreen: SplashScreen, public one: OneSignal) {
    platform.ready().then(() => {

      this.platform.ready().then(() => {
        let appId = '7198d30a-bbcc-4b5a-8643-4d269d6ac087';
        let googleProjectNumber = '73724290118';

        if (this.platform.is('cordova')) {
          this.one.startInit(appId, googleProjectNumber);
          this.one.inFocusDisplaying(this.one.OSInFocusDisplayOption.Notification);
          this.one.setSubscription(true);
          this.one.enableVibrate(true);
          this.one.getIds().then(ids => {
            console.log(JSON.stringify(ids['userId']));   //PlayerId
          });
          this.one.endInit();
          this.statusBar.styleDefault();
          this.statusBar.backgroundColorByHexString("#999999");

          setTimeout(() => {
            this.splashScreen.hide();
          }, 500);

        }
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }



}
