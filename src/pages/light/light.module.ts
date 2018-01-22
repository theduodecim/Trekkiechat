import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {LightPage} from "./light";
import {PipesModule} from "../../pipes/pipes.module";
import {Ng2OrderModule} from "ng2-order-pipe";



@NgModule({
  declarations: [
    LightPage,
  ],
  imports: [
    IonicPageModule.forChild(LightPage),
    [IonicModule, PipesModule, Ng2OrderModule ,/* OneSignalModule*/],
  ],
  exports: [
    LightPage,
  ],
  providers: [
  /*OneSignalListenerService,
  OneSignalSenderService*/
  ]
})
export class LightPageModule {}

