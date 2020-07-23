import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SpotifyService } from '../services/spotify.services';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  token: any ;
  result:any = [];
  searchStr: string;
  resultadoUltimaPesquisa: any = [];
  query: FormControl = new FormControl();

  constructor(
      private _spotifyService: SpotifyService, 
      private _localStorageService: LocalStorageService,
      private _route: ActivatedRoute,
      private router: Router) { 
      
       
    }

  ngOnInit(): void {

    this.buscarDadosHistorico();
    this.query.valueChanges.pipe(debounceTime(400),distinctUntilChanged())
    .subscribe((query) => {this._spotifyService.searchMusic(query, 'album,track')
        .subscribe(
          (res:any) => {
            this._localStorageService.setData("resultadoUltimaPesquisa",res);   
            this.result  = res;
           
          })
    });

    this.buscarDadosHistorico();
  }

/*   preecherBusca = () => {
    console.log("BUSCAR QUERY");
    this.query.setValue(this._localStorageService.getData("query"))
    //console.log(this._localStorageService.getData("query"))
    console.log(this.query.value)
    this._spotifyService.searchMusic(this.query.value, 'album,track')
        .subscribe(
          (res:any) => {
            this.result  = res;
           
          })
  } */

  buscarDadosHistorico = () => {
    this.resultadoUltimaPesquisa = this._localStorageService.getData("resultadoUltimaPesquisa");
  }

  navegar = (id:any) => { 
    this.router.navigate(["/detalhes/", id ]);
  }

}
