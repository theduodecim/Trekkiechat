import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../providers/services/auth.services";
import {UserProvider} from "../../providers/user/user";
/**
 * Generated class for the AvatarprofilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avatarprofiles',
  templateUrl: 'avatarprofiles.html',
})
export class AvatarprofilesPage {
  avatarPic: string;
  item: any;
  userProfile: any = null;
  filteredpictures = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public userservice: UserProvider) {
    this.userservice.getallpcitures().then((res: any) => {
      this.filteredpictures = res;

    })
  }




}
