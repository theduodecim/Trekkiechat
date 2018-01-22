import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Config} from '../config';
import {HttpClient, HttpHeaders} from "@angular/common/http";



@Injectable()
export class OneSignalSenderService {
  private pushUrl = 'https://onesignal.com/api/v1/notifications';

  constructor(public http: HttpClient) {
  }

  send(message) {
    let data = {
      'app_id': Config.oneSignalAppId,
      'contents': { 'en': message },
      'included_segments': ['Active Users']
    };
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + Config.oneSignalRestApiKey,
      'Content-Type': 'application/json'
    });
  let options = ({ headers: headers });
    this.http.post(this.pushUrl, data, options)
      .subscribe(x => console.log(x));
  }
}
