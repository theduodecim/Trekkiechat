/*import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/services/auth.services";
import {DataService} from "../../providers/services/data.services";
import {AngularFireList } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'as-page-chat-messages',
  templateUrl: './chat-messages.page.html'
})

export class ChatMessagesPage {
  item: any;
  messages$: AngularFireList<any>;
  placeholderText: string = 'Enter a message';

  constructor(navParams: NavParams, data: DataService, public auth: AuthService) {
    this.item = navParams.get('item');
    this.messages$ = data.getChatMessages(this.item.$key);
    this.setPlaceholder(auth);
  }

  send(message: string) {
    this.messages$.push({
      createdAt: new Date().getTime(),
      from: this.auth.getName(),
      text: message
    });
  }

  setPlaceholder(auth) {
    if (!auth.authenticated) {
      this.placeholderText = 'Please, login to post a message';
    }
  }
}*/
