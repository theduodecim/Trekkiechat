import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreq } from '../../models/interfaces/request';
import firebase from 'firebase';
/**
 * Generated class for the BuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {
  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];  //check the episode
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userservice: UserProvider, // so if we are adding an friend the best approach is inject the userservices
              public alertCtrl: AlertController,
              public requestservice: RequestsProvider) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
      // this create an temporaly array with the all users in the app,
      // this will generate lag if the user grow?
    })
  }

  ionViewDidLoad() {

  }

  // this is the function to search the users
  // inside our backend ya que esta usamos
  // filteredusers array this already has the value we need.
  searchuser(searchbar) { //we create a function to take our search bar in the template
    this.filteredusers = this.temparr;
    let q = searchbar.target.value; // let  // this seems to take the value of the searchbar
    if (q.trim() == '') { // trim?
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => { // filter needs a value
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) { // check this if
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) { // this sends the request to add people
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You are your friend always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });

      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }


}
