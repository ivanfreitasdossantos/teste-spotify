import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SpotifyService } from '../services/spotify.services';
import { FormControl } from '@angular/forms';
import { Artist } from '../models/Artist';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  result:any;
  searchStr: string;
  results: any;
  resultsAlbuns: any;
  resultsMusicas: any;
  query: FormControl = new FormControl();

  constructor(private loginService: LoginService, private _spotifyService: SpotifyService) { }

  ngOnInit(): void {
    
    this.query.valueChanges.pipe(debounceTime(400),distinctUntilChanged())
      .subscribe(query => this._spotifyService.getAuth()
        .subscribe((res:any) => { this._spotifyService.searchMusic(query, 'artist,album,track', res.access_token)
          .subscribe(
            (res:any) => {   
              console.log(res)
              //this.results = res.artists.items
              this.resultsAlbuns = res.albums.items
              this.resultsMusicas = res.tracks.items
            })
          }
        )
      );
  }

  /* this._spotifyService.searchMusic(query, 'artist', res).subscribe(
    res => {
      console.log(res)
      this.results = res
    }) */
  logar(){

    this.loginService.autorizar().subscribe((data) => {
      this.result = data;
      console.log(data);
    },
    (error) => {
      console.log(error);
      this.result =[];
    });

    /* this.query.valueChanges.pipe(
      debounceTime(400),distinctUntilChanged())
      .subscribe(query => this._spotifyService.getAuth()
      .subscribe(res => this._spotifyService.searchMusic(query, 'artist', res).subscribe(
        res => {
          console.log(res)
           // this.results = res
        })
      )); */
  }


}
