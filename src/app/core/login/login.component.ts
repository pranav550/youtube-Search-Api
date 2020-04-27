import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void { }
  // function for sign with google
  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.checkUserLogin()
  }
  // check userlogin or not
  public checkUserLogin():void {
    try {
      this.authService.authState.subscribe((user) => {
        if (user) {
          localStorage.setItem('UserToken', JSON.stringify(user.authToken));
          if (JSON.parse(localStorage.getItem('UserToken'))) {
            this.router.navigate(['youtube/search'])
          }
        }
        else {
          localStorage.setItem('UserToken', null);
          JSON.parse(localStorage.getItem('UserToken'));
        }
      });
    }
    catch (excep) { }
  }

}
