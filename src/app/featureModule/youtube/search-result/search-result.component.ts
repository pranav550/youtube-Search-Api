import { Component, OnInit,Input } from '@angular/core';
import { Videos } from './../../../shared/models/video';
import { MockService } from './../../../shared/services/mock.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit  {
  @Input() youtubeData: any;
  playerVars = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;
  clientId:string;
  videoId:string
  constructor(private mock:MockService) { }

  ngOnInit(): void {
    this.mock.getSelectedVideo.subscribe(resp=>{
      this.clientId=resp
    })
  }

  // fuction for select videoid
  public selectVedio(vedioId){
    this.videoId=vedioId
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
