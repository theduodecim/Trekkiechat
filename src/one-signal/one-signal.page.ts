import { Component } from '@angular/core';
import { OneSignalSenderService } from './one-signal-sender.service';
import {OneSignalListenerService} from './one-signal-listener-service';

@Component({
  templateUrl: 'one-signal.html'
})
export class OneSignalPage {
  message: string;

  private pushSenderService: OneSignalSenderService;
  private pushListener: OneSignalListenerService;

  constructor(pushSenderService: OneSignalSenderService, pushListener: OneSignalListenerService) {
    this.pushSenderService = pushSenderService;
    this.pushListener = pushListener;
  }

  sendMessage() {
    this.pushSenderService.send(this.message);
  }
}


// WEBPACK FOOTER //
// ./src/pages/one-signal/one-signal.page.ts
