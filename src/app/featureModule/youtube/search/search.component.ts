import { Videos } from './../../../shared/models/video';
import { MockService } from './../../../shared/services/mock.service';
import { Component, OnInit } from '@angular/core';
import { delay, debounceTime, map } from 'rxjs/operators';
import { Constants } from "../../../utils/constants";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";
import { fromEvent } from 'rxjs';
// import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public user: SocialUser;
  private loggedIn: boolean;
  youtubeData: Videos[];
  search: string;
  options: string[]
  apiUrl: string
  results: string = "2";
  filteredOptions: any = [];
  channelId: string;

  constructor(private mock: MockService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginUser()
  }

  // function for login user
  public loginUser(): void {
    try {
      this.authService.authState.subscribe((user) => {
        if (user) {
          this.user = user;
          this.loggedIn = (user != null);
        }
        else {
          this.loggedIn = (user = null);
        }
      });
    }
    catch (excep) { }
  }

  // function for listing of video
  public YouTubeList(): void {
    try {
      this.mock.getYoutubeApi(this.apiUrl).pipe(debounceTime(3000))
        .subscribe(data => {
          if (data) {
            data.items.map(value => {
              this.channelId = value.snippet.channelId
              this.mock.selectVideoId.next(this.channelId)
            })
            this.youtubeData = data.items
          }
          else {
            this.youtubeData = null
          }
        })
    }
    catch (excep) { }
  }

  // function for searching
  public selectedSearch(search: string): void {
    // const example = fromEvent(search, 'keyup').pipe(map(i => 
    //   console.log(i)
    //   ));
    this.search = search
    if (this.search.length > 6) {
      setTimeout(() => {
        this.apiUrl = `maxResults=${this.results}&q=${this.search}&type=video&key=${Constants.key}`
        this.YouTubeList()
      }, 3000)
    }
  }

  // function for signout the user 
  public signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('UserToken');
    this.router.navigate(['login'])
  }

}
