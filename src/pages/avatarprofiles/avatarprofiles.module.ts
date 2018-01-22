import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { AvatarprofilesPage } from './avatarprofiles';

@NgModule({
  declarations: [
    AvatarprofilesPage,
  ],
  imports: [
    IonicPageModule.forChild(AvatarprofilesPage),
    [IonicModule]
  ],
  entryComponents: [
    AvatarprofilesPage,
  ],
})
export class AvatarprofilesPageModule {}
