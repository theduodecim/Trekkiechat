import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular'; // events are temporary objects que crean un real efect
import { GroupsProvider } from '../../providers/groups/groups';
import * as firebase from "firebase";
/**
 * Generated class for the GroupsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({ //episode 11
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups;
  firegroup = firebase.database().ref('/groups');
  mygroups: Array<any> = []; // "the array"

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events, // real effect
              public loadingCtrl: LoadingController,
              public groupservice: GroupsProvider) {
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    this.groupservice.getmygroups();                             // we present all the groups of the particular user
    this.events.subscribe('allmygroups', () => { // subscribe this real time effect
      loader.dismiss();
      this.allmygroups = this.groupservice.mygroups;
    })
}

  ionViewDidLeave() {
    this.events.unsubscribe('allmygroups'); // newgroup?
  }

  addgroup() {
    this.navCtrl.push('NewgroupPage')
  }

  openchat(group) { // when the user tabs in the group
    alert('Groupchat ' + group.groupName);
    this.groupservice.getintogroup(group.groupName);
    this.navCtrl.push('GroupchatPage', { groupName: group.groupName });
  }

}
