/*
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Content, Events } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
/!*import { ImghandlerProvider } from '../../providers/imghandler/imghandler';*!/
import firebase from 'firebase';
import {ImghandlerProvider} from "../../providers/imghandler/imghandler";

/!**
 * Generated class for the GroupchatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 *!/
@IonicPage()
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {
  @ViewChild('content') content: Content;
  owner: boolean = false;
  groupName;
  newmessage;
  allgroupmsgs;
  alignuid;
  photoURL;
  imgornot;
  firegroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public groupservice: GroupsProvider,
              public actionSheet: ActionSheetController,
              public events: Events,
              public imgstore: ImghandlerProvider,
              public loadingCtrl: LoadingController) {

    this.alignuid = firebase.auth().currentUser.uid;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.groupName = this.navParams.get('groupName');
    this.groupservice.getownership(this.groupName).then((res) => {
      // this will get the owner of a particular group and will display the action sheet
      if (res)
        this.owner = true;
    }).catch((err) => {
      alert(err);
    })
   /!* this.groupservice.getgroupmsgs(this.groupName);*!/
    this.events.subscribe('newgroupmsg', () => {
      this.allgroupmsgs = [];
      this.imgornot = [];
      this.allgroupmsgs = this.groupservice.groupmsgs;
      for (let key in this.allgroupmsgs) { // let
        let d = new Date(this.allgroupmsgs[key].timestamp); // let
        let hours = d.getHours(); // let
        let minutes = "0" + d.getMinutes(); // let
        let month = d.getMonth(); // let
        let da = d.getDate(); // let

        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let formattedTime = monthNames[month] + "-" + da + "-" + hours + ":" + minutes.substr(-2);

        this.allgroupmsgs[key].timestamp = formattedTime;
        if (this.allgroupmsgs[key].message.substring(0, 4) === 'http') {
          this.imgornot.push(true);
        }
        else {
          this.imgornot.push(false);
        }
      }
      this.scrollto();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
  }

  /!*getingtogroup(groupname) {
    if(groupname != null) {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) =>
      {
      if(snapshot.val() != null) {
        let temp = snapshot.val().members;
       }
      })
    }
  }*!/




  sendpicmsg() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.groupservice.addgroupmsg(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }

  presentOwnerSheet() { // this are the sheets we are talking the course
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push('GroupbuddiesPage');
          }
        },
        {
          text: 'Remove member',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push('GroupmembersPage');
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', {groupName: this.groupName}); // ep 15
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          handler: () => {
            this.groupservice.deletegroup().then(() => { // ep 15
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  presentMemberSheet() { // this is the member sheet
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',
          handler: () => {
            this.groupservice.leavegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }


  // there are 3 locations one is the message board of particular user
  // first he needs to add



  addgroupmsg() { // this will add a message inside of the other user message board
    this.groupservice.addgroupmsg(this.newmessage).then(() => {
      this.scrollto();
      this.newmessage = '';
    })
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
*/
