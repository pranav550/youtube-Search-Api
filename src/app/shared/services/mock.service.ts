import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../utils/constants";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Videos } from './../models/video';
@Injectable({
  providedIn: 'root'
})
export class MockService {
  YOUTUBE_API_URL = Constants.url;
  constructor(private http:HttpClient) { }
  // get Api call
  getYoutubeApi(apiurl):Observable<any>{
    return this.http.get(this.YOUTUBE_API_URL+apiurl)
  }
  
  selectVideoId= new BehaviorSubject("");
  getSelectedVideo=this.selectVideoId.asObservable();
}
