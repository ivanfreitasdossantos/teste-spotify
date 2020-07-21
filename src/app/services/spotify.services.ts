import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


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
  private body: any;


  constructor(private _http: HttpClient) { }


  // Get access token from Spotify to use API
  getAuth = () => {

    let headers =  new HttpHeaders();
    console.log("cliente id");
    console.log(this.clientId);
    headers = headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this._http.post('https://accounts.spotify.com/api/token', body, {headers: headers});

  }

  // Get search results for a query
  searchMusic(query: string, type = 'artist,album,track', authToken: string) {
    let headers =  new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + authToken);

    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=20&type=' + type ;

    return this._http.get(this.searchUrl, { 'headers': headers })
    .pipe(
      map(res => res)
      );
  }

  // Get data about artist that has been chosen to view
  getArtist(id: string, authToken: string) {
    let headers =  new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + authToken);

    this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;

    return this._http.get(this.artistUrl, { headers: headers })
    .pipe(
      map(res => res)
      );
  }

  // Get the albums about the artist that has been chosen
  getAlbums(id: string, authToken: string) {
    let headers =  new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + authToken);

    this.albumsUrl = 'https://api.spotify.com/v1/artists/' + id + '/albums?market=US&album_type=single';

    return this._http.get(this.albumsUrl, { headers: headers })
    .pipe(
      map(res => res)
      );
  }

  // Get Tracks in ablum selected
   getAlbum(id: string, authToken: string) {
    let headers =  new HttpHeaders();
    headers =headers.append('Authorization', 'Bearer ' + authToken);

    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;

    return this._http.get(this.albumUrl, { headers: headers })
    .pipe(
      map(res => res)
      );
  }
}
