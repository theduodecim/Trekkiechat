import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import {GooglePlus} from "@ionic-native/google-plus";
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;  //
  displayName: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: UserProvider,
              public zone: NgZone, // import zone to see the real effect
              public alertCtrl: AlertController, // here we imported an alert Controller
              public imghandler: ImghandlerProvider,
              public googleplus: GooglePlus) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }


  //this is the function to load the new update the avatar and the name in the profile tab
  loaduserdetails() {
    this.user.getuserdetails()
      .then((res: any) => {
      this.displayName = res.displayName; //
      this.zone.run(() => { // zone is using to see the real efect when the avatar is uploaded and the name
        this.avatar = res.photoURL; //
      })
    })
  }




  editimage() { //this is the alert to update the img
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.uploadimage().then((url: any) => {
      this.user.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile pic was not changed');
        statusalert.present();
      })
    })
  }




  editname() { // here we are creating an alert to change the nickname
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({   // this is a basic structure to create an alert
      title: 'Edit Nickname',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
        }
      },
        {
          text: 'Edit',
          handler: data => { // here we store the data of the nickname
            if (data.nickname) {
              this.user.updatedisplayname(data.nickname).then((res: any) => {
                if (res.success) {
                  statusalert.setTitle('Updated');
                  statusalert.setSubTitle('Your nickname has been changed');
                  statusalert.present();
                  this.zone.run(() => { // here we update this change in real time efect with zone
                    this.displayName = data.nickname; // we pass the data inside this nickname
                  })
                }
                else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('Your nickname was not changed');
                  statusalert.present();
                }
              })
            }
          }
        }]
    });
    alert.present();
  }

  onLogout() {
    this.user.logout();
    this.navCtrl.parent.parent.setRoot('LoginPage');
  }

}
