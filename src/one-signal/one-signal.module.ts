import { NgModule } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { IonicModule } from 'ionic-angular';
import { OneSignalSenderService } from './one-signal-sender.service';
import { OneSignalPage } from './one-signal.page';
import {OneSignalListenerService} from './one-signal-listener-service';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  imports: [IonicModule,
    HttpClientModule

  ],
  declarations: [OneSignalPage],
  entryComponents: [OneSignalPage],
  providers: [
    OneSignalListenerService,
    OneSignalSenderService,
    OneSignal,
  ]
})
export class OneSignalModule {

}


// WEBPACK FOOTER //
// ./src/pages/one-signal/one-signal.module.ts
