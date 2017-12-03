import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { GroupsProvider } from '../../providers/groups/groups';

@IonicPage()
@Component({
  selector: 'page-groupbuddies',
  templateUrl: 'groupbuddies.html',
})
export class GroupbuddiesPage {
  myfriends = [];
  groupmembers = [];
  searchstring;
  tempmyfriends = [];
  newbuddy;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestservice: RequestsProvider,
              public events: Events,
              public groupservice: GroupsProvider) {}



  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.events.subscribe('gotintogroup', () => {
      this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.uid), 1);
      this.tempmyfriends = this.myfriends;
    })
    this.events.subscribe('friends', () => {

      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
      this.groupmembers = this.groupservice.currentgroup;
      for (let key in this.groupmembers) //let
        for (let friend in this.myfriends) { // let
          if (this.groupmembers[key].uid === this.myfriends[friend].uid)
            this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]), 1);
        }
      this.tempmyfriends = this.myfriends;
    })
  }

  searchuser(searchbar) {
    let tempfriends = this.tempmyfriends;

    let q = searchbar.target.value; // let

    if (q.trim() === '') {
      this.myfriends = this.tempmyfriends;
      return;
    }

    tempfriends = tempfriends.filter((v) => {  //concept of js mozilla baby
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {
        return false;
      }
    })
    this.myfriends = tempfriends;
  }

  addbuddy(buddy) {
    this.newbuddy = buddy;
    this.groupservice.addmember(buddy);
  }

}
