import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
import {RequestsProvider} from "../../providers/requests/requests";

@IonicPage()
@Component({
  selector: 'page-groupinfo',
  templateUrl: 'groupinfo.html',
})
export class GroupinfoPage {
  groupmembers;
  myfriends;
  myrequests;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public groupservice: GroupsProvider,
              public events: Events,
              public requestservice: RequestsProvider) {
  }

  ionViewDidLoad() {
     this.groupservice.getownership(this.groupservice.currentgroupname).then((res) => {
       if (res)
         this.groupmembers = this.groupservice.currentgroup;
       else {
         this.groupservice.getgroupmembers();
       }

     })
     this.events.subscribe('gotmembers', () => {
       this.groupmembers = this.groupservice.currentgroup;
     })
  }

  ionViewWillLeave() {
    this.events.unsubscribe('gotmembers');
  }


}
