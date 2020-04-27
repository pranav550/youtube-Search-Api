import { Videos } from './../../../shared/models/video';
import { MockService } from './../../../shared/services/mock.service';
import { Component, OnInit } from '@angular/core';
import { delay, debounceTime } from 'rxjs/operators';
import { Constants } from "../../../utils/constants";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";
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
  public loginUser() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  // function for listing of video
  public YouTubeList() {
    this.mock.getYoutubeApi(this.apiUrl).pipe(debounceTime(3000))
      .subscribe(data => {
        data.items.map(value => {
          this.channelId = value.snippet.channelId
          this.mock.selectVideoId.next(this.channelId)
        })
        this.youtubeData = data.items
      })
  }

  // function for searching
  public selectedSearch(search) {
    this.search = search
    if (this.search.length > 4) {
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
