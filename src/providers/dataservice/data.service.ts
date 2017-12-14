import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database-deprecated";

@Injectable()
export class DataService {
  constructor(private db: AngularFireDatabase) {
  }

  getChatMessages(chatId: string) {
    return this.db.list(`ftchatrooms/${chatId}/messages`);
  }

}
