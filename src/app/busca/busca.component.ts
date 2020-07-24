import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SpotifyService } from '../services/spotify.services';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Album } from '../models/Album';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  token: any ;
  result: Response;
  searchStr: string;
  resultadoUltimaPesquisa: any = [];
  query: FormControl = new FormControl();

  constructor(
      private _spotifyService: SpotifyService, 
      private _localStorageService: LocalStorageService,
      private _router: Router) { 
      
       
    }

  ngOnInit(): void {

    this.buscarDadosHistorico();
    this.query.valueChanges.pipe(debounceTime(400),distinctUntilChanged())
    .subscribe((query) => {
      this._spotifyService.searchMusic(query, 'album,track')
        .subscribe(
          (res: Response) => {
            this._localStorageService.setData("resultadoUltimaPesquisa",res);   
            this.result  = res;
          },(error) => {  
            if( error.status ==  environment.codError401 ){
              alert("Seu acesso expirou!! Clique em ok e acesse novamente"); 
              this._router.navigate(["/"]);
            }
            
          })
    });

    this.buscarDadosHistorico();
  }


  buscarDadosHistorico = () => {
    this.resultadoUltimaPesquisa = this._localStorageService.getData("resultadoUltimaPesquisa");
  }

  navegar = (id:any) => {
    this._router.navigate(["/album/", id ]);
  }

}
