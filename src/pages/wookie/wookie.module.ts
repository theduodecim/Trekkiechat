import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WookiePage } from './wookie';

@NgModule({
  declarations: [
    WookiePage,
  ],
  imports: [
    IonicPageModule.forChild(WookiePage),
  ],
})
export class WookiePageModule {}
