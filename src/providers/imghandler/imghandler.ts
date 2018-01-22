import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import {FileChooser} from "@ionic-native/file-chooser";
import firebase from 'firebase';


/*
  Generated class for the ImghandlerProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();

  constructor(public filechooser: FileChooser) {}


  uploadimage() {
    let promise = new Promise((resolve, reject) => {
      this.filechooser.open().then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              let reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                let imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                let imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res) => {
                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                    resolve(url);
                  }).catch((err) => {
                    reject(err);
                  })
                }).catch((err) => {
                  reject(err);
                })
              }
            })
          })
        })
      })
    })
    return promise;
  }


/*uploadimage() {
  let loader = this.loadingCtrl.create({
    content: 'Please wait'
  });
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }
  let promise = new Promise((resolve, reject) => {
    this.camera.getPicture(options).then((imageData) => {
      loader.present();
      let imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
      imageStore.putString(imageData, 'base64').then((res) => {
        this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
          loader.dismiss()
          resolve(url);
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })

    }, (err) => {
    }).catch((err) => {
      reject(err);
    });
    loader.dismiss();
  })
  return promise;
}*/
 /* grouppicstore(groupname) {
    let promise = new Promise((resolve, reject) => { // let
      this.filechooser.open().then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              let reader = new FileReader(); // let
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                let imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' }); // let
                let imageStore = this.firestore.ref('/groupimages').child(firebase.auth().currentUser.uid).child(groupname); // let
                imageStore.put(imgBlob).then((res) => {
                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).child(groupname).getDownloadURL().then((url) => {
                    resolve(url);
                  }).catch((err) => {
                    reject(err);
                  })
                }).catch((err) => {
                  reject(err);
                })
              }
            })
          })
        })
      })
    })
    return promise;
  }*/

  picmsgstore() { // choosing and uploading images part 2 of uploading the image
    let promise = new Promise((resolve, reject) => { // let
      this.filechooser.open().then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              let reader = new FileReader(); // let
              reader.readAsArrayBuffer(resFile); // let
              reader.onloadend = (evt: any) => {
                let imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'}); // let
                let uuid = this.guid(); // let
                let imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid); // let
                imageStore.put(imgBlob).then((res) => {
                  resolve(res.downloadURL);
                }).catch((err) => {
                  reject(err);
                })
                  .catch((err) => {
                    reject(err);
                  })
              }
            })
          })
        })
      })
    })
    return promise;
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
