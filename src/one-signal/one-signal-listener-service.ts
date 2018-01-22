import { Injectable } from '@angular/core';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import {isCordovaAvailable} from '../providers/services/cordovaservice';
import {Config} from '../config';



@Injectable()
export class OneSignalListenerService {

  constructor(private oneSignal: OneSignal) {
    if (isCordovaAvailable()) {
      this.oneSignal.startInit(Config.oneSignalAppId, Config.sender_id);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
      this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
      this.oneSignal.endInit();
    }
  }

  private onPushReceived(payload: OSNotificationPayload) {
    alert('Push recevied:' + payload.body);
  }

  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push opened: ' + payload.body);
  }
}


// WEBPACK FOOTER //
// ./src/pages/one-signal/one-signal-listener.service.ts
