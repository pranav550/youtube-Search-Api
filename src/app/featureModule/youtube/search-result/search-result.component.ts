import { Component, OnInit, Input } from '@angular/core';
import { Videos } from './../../../shared/models/video';
import { MockService } from './../../../shared/services/mock.service';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  public user: SocialUser;
  private loggedIn: boolean;
  @Input() youtubeData:Videos;
  playerVars = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;
  clientId: string;
  videoId: string
  loadingvideoId: boolean = false;
  constructor(private mock: MockService, private authService: AuthService) { }

  ngOnInit(): void {
    this.mock.getSelectedVideo.subscribe(resp => {
      this.clientId = resp
    })
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  // fuction for select videoid
  public selectVedio(vedioId) {
    this.videoId = ""
    this.loadingvideoId = true
    setTimeout(() => {
      this.videoId = vedioId
    }, 1000)
    this.loadingvideoId = false
  }

  // function for state change
  public onStateChange(event) {
    this.ytEvent = event.data;
  }
  // function for save player
  public savePlayer(player) {
    this.player = player;
  }

  public playVideo() {
    this.player.playVideo();
  }

  public pauseVideo() {
    this.player.pauseVideo();
  }
}
