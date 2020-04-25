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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.router.navigate(['youtube/search'])
  }

  public signOut(): void {
    this.authService.signOut();
  }

}
