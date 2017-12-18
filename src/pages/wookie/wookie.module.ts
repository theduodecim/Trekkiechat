import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { WookiePage } from './wookie';
import {Ng2OrderModule} from "ng2-order-pipe";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    WookiePage,
  ],
  imports: [
    IonicPageModule.forChild(WookiePage),
    [IonicModule, PipesModule, Ng2OrderModule]
  ],
})
export class WookiePageModule {}
