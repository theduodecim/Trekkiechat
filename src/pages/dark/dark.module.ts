import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { DarkPage } from './dark';
import {Ng2OrderModule} from "ng2-order-pipe";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    DarkPage,
  ],
  imports: [
    IonicPageModule.forChild(DarkPage),
    [IonicModule, PipesModule, Ng2OrderModule]
  ],
})
export class DarkPageModule {}
