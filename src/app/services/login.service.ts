import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;

  params: any  = {
    client_id: "91d1354f118746a4bab53c0e5714c77e",
    response_type:"",
    redirect_uri:"http://localhost:4200/busca"
  }

  constructor(private _http: HttpClient) { }

  autorizar() {
    let headers =  new HttpHeaders({'Content-Type': 'text/uri-list'});
    headers.append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this._http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
  }


/*   res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  })); */
}