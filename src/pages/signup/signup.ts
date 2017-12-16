import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    email: '',
    password: '',
    displayName: ''
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userservice: UserProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  signup() {
    let toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('All fields are required'); // check this
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('Password is not strong. Try giving more than six characters'); //check this
      toaster.present();
    }
   /* else if (this.newuser.email = ('@Email')) {
      toaster.setMessage('Invalid Email Field'); //check this
      toaster.present();
    }*/
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          //group = getgroup(id_grupo)
          //group.addgroupmember(id de nuevo usuario, lo que pida la funcioan)
          //group1 = getgroup(id_grupo2)
          //group1.addgroupmember(id de nuevo usuario, lo que pida la funcioan)
          //group2 = getgroup(id_grupo3)
          //group2.addgroupmember(id de nuevo usuario, lo que pida la funcioan)
          this.navCtrl.push('ProfilePage'); // check this!
        else {
          let loader = this.loadingCtrl.create({
            content: '???'
          });
          loader.present();
          alert('Error' + res);
        }
      })
    }
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}
