/*
import {GooglePlus} from "@ionic-native/google-plus";

export class GoogleService {
  static token = "";
  static uid = 0;

  constructor(public GooglePlus: GooglePlus) {}

  static login(): Promise<any> {
    return new Promise(
      resolve => {
        return window['plugins'].googleplus.login(
          {
            'scopes': 'EMAIL PLUS_LOGIN',
            'webClientId': '73724290118-et73usq9p6hi21emsrqpgqr64hoglimg.apps.googleusercontent.com',
            'offline': true
          },
          (data) => {
            return this.authResponse(data);
          },
          (error) => {
            return this.handleError(error);
          }
        );
      }
    )
  }

 /!* static authResponse(data: GoogleResponse): any {
    console.log(data);
    //this.token = data.oauthToken;
    //this.uid = data.userId;

    return {
      success: true,
      data: {
        email: data.email,
        displayName: data.displayName || '',
        imageUrl: data.imageUrl || ''
      }
    };
  }*!/

  static handleError(error): any {
    // TODO check any error format
    console.log('Google+ Error', error);
    return {
      success: false,
      msg: error
    }
  }

  static logout() {
    window['plugins'].googleplus.logout(
      (error) => {
        console.log('Google+ Logout Error', error)
      }
    );
  }
}
*/
