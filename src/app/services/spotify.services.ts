import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;
  private apiSpotifyURL: string = environment.API_SPOTIFY_URL;
  private body: any;


  constructor(private _http: HttpClient,
              private _localStorageService: LocalStorageService) { }



/*   getAuth = () => {

    let headers =  new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this._http.post('https://accounts.spotify.com/api/token', body, {headers: headers});

  } */


  searchMusic = (query: string, type = 'artist,album,track') => {

    let headers = this.getHeaders();
    this.searchUrl = `${this.apiSpotifyURL}/v1/search?query=${query}&offset=0&limit=20&type=${type}`;
    return this._http.get(this.searchUrl, { 'headers': headers })
    .pipe(
      map(res => res)
      );

  }

  getArtist = (id: string)  => {

    let headers = this.getHeaders();
    this.artistUrl = `${this.apiSpotifyURL}/v1/artists/${id}`;
    return this._http.get(this.artistUrl, { headers: headers }).pipe(map(res => res));

  }


  getAlbums = (id: string) => {

    let headers = this.getHeaders();
    this.albumsUrl = `${this.apiSpotifyURL}/v1/artists/${id}/albums?market=US&album_type=single`;
    return this._http.get(this.albumsUrl, { headers: headers })
    .pipe(map(res => res));

  }

  getAlbum = (id: string) => {

    let headers = this.getHeaders();
    this.albumUrl = `${this.apiSpotifyURL}/v1/albums/${id}`;
    return this._http.get(this.albumUrl, { headers: headers }).pipe(map(res => res));

  }

  getHeaders = () =>{

    let headers =  new HttpHeaders();
    let authToken = this._localStorageService.getData("token");
    return headers =headers.append('Authorization', 'Bearer ' + authToken);

  }
}
