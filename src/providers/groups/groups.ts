import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';


/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class GroupsProvider {
  firegroup = firebase.database().ref('/groups');
  mygroups: Array<any> = [];
  currentgroup: Array<any> = [];
  currentgroupname;
  grouppic;
  groupmsgs;

  constructor(public events: Events) {}




  addgroup(newGroup) {
    let promise = new Promise((resolve, reject) => { // let
      this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
        groupimage: newGroup.groupPic,
        msgboard: '',
        owner: firebase.auth().currentUser.uid
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }
  getmygroups() {
    this.firegroup.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.mygroups = [];
      if(snapshot.val() != null) {
        let temp = snapshot.val(); // let
        for (let key in temp) { // let
          let newgroup = { // let
            groupName: key,
            groupimage: temp[key].groupimage
          }
          this.mygroups.push(newgroup);
        }
      }
      this.events.publish('allmygroups');
    })

  }

  getintogroup(groupname) {
    // when the user tabs particular group we are getting
    // into the group and getting the members group and store in the array currectgroup
    if (groupname != null) {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => { // this saves the value in the group name
        if (snapshot.val() != null) { // si el value tiene algun valor
          var temp = snapshot.val().members; // subscribe this value to the members and store this in temp varible
          this.currentgroup = []; // llamamos a este currentgroup que es type array
          for (var key in temp) { // ahora creamos un loop con el
            this.currentgroup.push(temp[key]); // valor de los miembros y lo soltamos dentro de currentgroup
          }
           this.currentgroupname = groupname;
           this.events.publish('gotintogroups');
          // aca lo que hace es crear un real time efect para los usuarios
        }
      })
    }
  }

  getownership(groupname) {
    let promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => { // let
        let temp = snapshot.val().owner; // let
        if (temp == firebase.auth().currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }

  getgroupimage() { // episode 13
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
        .once('value', (snapshot) => {
        this.grouppic = snapshot.val().groupimage;
        resolve(true);
      })
    })

  }



  addmember(newmember) { // addign the member THE GOLD MEMBER
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
      .child('members').push(newmember).then(() => {
      this.getgroupimage().then(() => {
        this.firegroup.child(newmember.uid).child(this.currentgroupname).set({
          groupimage: this.grouppic,
          owner: firebase.auth().currentUser.uid,
          msgboard: ''
        }).catch((err) => {
          console.log(err);
        })
      });
      this.getintogroup(this.currentgroupname);
    });
  }

  deletemember(member) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
      .child('members').orderByChild('uid').equalTo(member.uid).once('value', (snapshot) => {
      snapshot.ref.remove().then(() => {
        this.firegroup.child(member.uid).child(this.currentgroupname).remove().then(() => {
          this.getintogroup(this.currentgroupname);
        })
      })
    })
  }


  getgroupmembers() {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
      let tempdata = snapshot.val().owner; // let
      this.firegroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        let tempvar = snapshot.val(); // let
        for (var key in tempvar) { // let
          this.currentgroup.push(tempvar[key]);
        }
      })
    });
    this.events.publish('gotmembers');
  }

  leavegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        let tempowner = snapshot.val().owner; //let
        this.firegroup.child(tempowner).child(this.currentgroupname).child('members').orderByChild('uid')
          .equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {
          snapshot.ref.remove().then(() => {
            this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
              resolve(true);
            }).catch((err) => {
              reject(err);
            })
          }).catch((err) => {
            reject(err);
          })
        })
      })
    })
  }
  deletegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        let tempmembers = snapshot.val(); // let

        for (let key in tempmembers) { // let
          this.firegroup.child(tempmembers[key].uid).child(this.currentgroupname).remove();
        }

        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        })

      })
    })
  }

 getgroupmsgs(groupname) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).child('msgboard').on('value', (snapshot) => {
      let tempmsgholder = snapshot.val(); // let
      this.groupmsgs = [];
      for (let key in tempmsgholder) // let
      this.groupmsgs.push(tempmsgholder[key]);
      this.events.publish('newgroupmsg');
    })

  }

  addgroupmsg(newmessage) {   // this is not the beast approach becose, this is storing multiples times
    return new Promise((resolve) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('owner').once('value', (snapshot) => {
        let tempowner = snapshot.val(); // let
        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('msgboard').push({
          sentby: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName,
          photoURL: firebase.auth().currentUser.photoURL,
          message: newmessage,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          if (tempowner != firebase.auth().currentUser.uid) {
            this.firegroup.child(tempowner).child(this.currentgroupname).child('msgboard').push({
              sentby: firebase.auth().currentUser.uid,
              displayName: firebase.auth().currentUser.displayName,
              photoURL: firebase.auth().currentUser.photoURL,
              message: newmessage,
              timestamp: firebase.database.ServerValue.TIMESTAMP
              //CONSTANT STATIC CONSTANT   on-null Object
              // Un valor de marcador de posición para completar automáticamente la marca de tiempo actual
              // (tiempo transcurrido desde la época de Unix, en milisegundos) según lo determinen
              // los servidores de Firebase
            })
          }
          let tempmembers = []; // let
          this.firegroup.child(tempowner).child(this.currentgroupname).child('members').once('value', (snapshot) => { // let
            let tempmembersobj = snapshot.val(); // let
            for (let key in tempmembersobj) // let
              tempmembers.push(tempmembersobj[key]);
          }).then(() => {
            let postedmsgs = tempmembers.map((item) => {
              if (item.uid != firebase.auth().currentUser.uid) {
                return new Promise((resolve) => {
                  this.postmsgs(item, newmessage, resolve);
                })
              }
            })
            Promise.all(postedmsgs).then(() => {
              this.getgroupmsgs(this.currentgroupname);
              resolve(true);
            })
          })
        })
      })
    })
  }

  postmsgs(member, msg, cb) {
    this.firegroup.child(member.uid).child(this.currentgroupname).child('msgboard').push({
      sentby: firebase.auth().currentUser.uid,
      displayName: firebase.auth().currentUser.displayName,
      photoURL: firebase.auth().currentUser.photoURL,
      message: msg,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      cb();
    })
  }


}
