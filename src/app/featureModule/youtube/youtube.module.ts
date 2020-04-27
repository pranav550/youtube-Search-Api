import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { Routes, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import { SearchResultComponent } from './search-result/search-result.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from "@angular/forms";
const routes: Routes = [
  
  {path:'', children:[
    {path:'search', component: SearchComponent},
    
  ]
}

];
@NgModule({
  declarations: [SearchComponent, SearchResultComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatAutocompleteModule,
    MatListModule,
    NgxYoutubePlayerModule.forRoot(),
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class YoutubeModule { }
