import { Videos } from './../../../shared/models/video';
import { MockService } from './../../../shared/services/mock.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Constants } from "../../../utils/constants";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // private user: SocialUser;
  // private loggedIn: boolean;
  youtubeData: Videos[];
  search: string;
  options: string[]
  apiUrl: string
  results: string = "1";
  filteredOptions: any = [];
  channelId: string


  constructor(private mock: MockService, private authService: AuthService) { }

  ngOnInit(): void {

  }
  // function for listing of video
  public YouTubeList() {
    this.mock.getYoutubeApi(this.apiUrl).pipe(delay(3000))
      .subscribe(data => {
        console.log(data.items)
        data.items.map(value => {
          this.channelId = value.snippet.channelId
          this.mock.selectVideoId.next(this.channelId)
          console.log(value.snippet.channelId)
        })
        this.youtubeData = data.items
      })
  }
  // function for searching
  public selectedSearch(search) {
    this.search = search

    if (this.search.length > 6) {
      console.log(this.search)
      this.apiUrl = `maxResults=${this.results}&q=${this.search}&type=video&key=${Constants.key}`
      this.YouTubeList()
    }
  }



}
