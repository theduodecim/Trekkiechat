/*
import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { ChatMessagesPage } from './chat-messages.page';
import {DataService} from "../../providers/services/data.services";
import {AngularFireList} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'as-page-chat-rooms',
  templateUrl: './chat-rooms.page.html'
})

export class ChatRoomsPage {
  items$: AngularFireList<any>;

  constructor(data: DataService, private nav: NavController) {
    this.items$ = data.getChatRooms();
  }

  public itemTapped(item) {
    this.nav.push(ChatMessagesPage, {
      item: item
    });
  }
}
*/
