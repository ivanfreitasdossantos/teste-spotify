import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SpotifyService } from '../services/spotify.services';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  result:any = [];
  searchStr: string;
  resultadoUltimaPesquisa: any = [];
  resultAlbuns: any;
  resultMusicas: any;
  query: FormControl = new FormControl();

  constructor(
      private _spotifyService: SpotifyService, 
      private _localStorageService: LocalStorageService,
      private router: Router) { }

  ngOnInit(): void {

    this.buscarDadosHistorico();
    this.query.valueChanges.pipe(debounceTime(400),distinctUntilChanged())
    .subscribe(query => this._spotifyService.getAuth()
      .subscribe((res:any) => { this._spotifyService.searchMusic(query, 'album,track', res.access_token)
        .subscribe(
          (res:any) => {
            this._localStorageService.setData("resultadoUltimaPesquisa",res);   
            console.log(res)
            this.result  = res;
            this.resultAlbuns = res.albums.items
            this.resultMusicas = res.tracks.items
          })
        }
      )
    );

    this.buscarDadosHistorico();
  }


  pesquisar(){
    console.log("pesquisando")
    this.query.valueChanges.pipe(debounceTime(400),distinctUntilChanged())
    .subscribe(query => this._spotifyService.getAuth()
      .subscribe((res:any) => { this._spotifyService.searchMusic(query, 'album,track', res.access_token)
        .subscribe(
          (res:any) => {
            this._localStorageService.setData("resultadoUltimaPesquisa",res);   
            console.log(res)
            this.result  = res;
            this.resultAlbuns = res.albums.items
            this.resultMusicas = res.tracks.items
          })
        }
      )
    );
  }


  buscarDadosHistorico(){
    this.resultadoUltimaPesquisa = this._localStorageService.getData("resultadoUltimaPesquisa");
    console.log("LOCAL STORAGE");
    console.log(this.resultadoUltimaPesquisa);
  }


  navegar(id:any){ 
    console.log("navegar");
    this.router.navigate(["/detalhes/", id ]);
  }

}
