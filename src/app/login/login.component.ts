import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: String;

  constructor(private _localStorageService: LocalStorageService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {

    this.getToken();

  }

  getToken = () => {
    if ( this._route.snapshot.fragment ) {
      this.token  = this._route.snapshot.fragment.match(/(?<=access_token=)(.*)(?=&token_type)/s)[0]; 
      this._localStorageService.setData("token",this.token);
      this.redirect();
    }
  }
  
  redirect = () => {
    this._router.navigateByUrl('/albums');
  }

  logar(){
    let url = "https://accounts.spotify.com/authorize?client_id=91d1354f118746a4bab53c0e5714c77e&redirect_uri=http:%2F%2flocalhost:4200&scope=user-read-private%20user-read-email&response_type=token&state=123&show_dialog=true";
    window.location.href = url;
  }

}
