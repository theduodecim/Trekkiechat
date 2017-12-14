import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {config} from "./app.firebaseconfig";
/*import { AuthProvider } from '../providers/auth/auth';*/
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { GroupsProvider } from '../providers/groups/groups';
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {DataService} from "../providers/services/data.services";
import {AuthService} from "../providers/services/auth.services";

/*import * as firebase from "firebase/app";*/



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    AngularFireDatabaseModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    FilePath,
    FileChooser,
    File,
    SplashScreen,
    {provide: ErrorHandler,
     useClass: IonicErrorHandler,},
    AngularFireAuth,
    UserProvider,
    ImghandlerProvider,
    RequestsProvider,
    ChatProvider,
    GroupsProvider,
    DataService,
    AuthService,
    AngularFireDatabase
  ]
})
export class AppModule {}
