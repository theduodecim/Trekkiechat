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
              public groupservice: GroupsProvider) {}  //injected th e groupprovider



  ionViewWillEnter() {
    this.requestservice.getmyfriends(); //
    this.events.subscribe('gotintogroup', () => {
      this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.uid), 1);  // we splice the list
      this.tempmyfriends = this.myfriends;
    })
    this.events.subscribe('friends', () => {

      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends; // lodash will be a better approach
                                                      // using comparations of this two arrays
      this.groupmembers = this.groupservice.currentgroup;
      for (var key in this.groupmembers) {  //let
        for (var friend in this.myfriends) // let
          if (this.groupmembers[key].uid === this.myfriends[friend].uid)
            this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]), 1); // if there are in the list thos user will display off
        }
      this.tempmyfriends = this.myfriends;
    })
  }

  searchuser(searchbar) { //in case
    let tempfriends = this.tempmyfriends; // we store our array of friends in the local variable

    let q = searchbar.target.value; // let

    if (q.trim() === '') {
      this.myfriends = this.tempmyfriends;
      return;
    }
    //we got the temfriends to have this arrays of my friends but temporaly cos when the user use delete this will change temporaly
    tempfriends = tempfriends.filter((v) => {  //concept of js mozilla baby
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
        return false;
    })
    this.myfriends = tempfriends; // my friends is the array we are displaying in the screen
  }

  addbuddy(buddy) {
    this.newbuddy = buddy;
    this.groupservice.addmember(buddy);
  }

}
