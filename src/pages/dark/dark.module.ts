import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DarkPage } from './dark';

@NgModule({
  declarations: [
    DarkPage,
  ],
  imports: [
    IonicPageModule.forChild(DarkPage),
  ],
})
export class DarkPageModule {}
