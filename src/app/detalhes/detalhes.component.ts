import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from '../models/Album';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  album: Album;
  albumId: string;
  musicaSelecionada: string;

  constructor( 
    private _spotifyService: SpotifyService,
    private _route: ActivatedRoute,
    private _router: Router) {

    }

  ngOnInit(): void {

    this.albumId  = this._route.snapshot.paramMap.get('id')
      this._spotifyService.getAlbum(this.albumId)
        .subscribe((res: Album) => {
            this.album = res
          },(error) => {
            alert("Seu acesso expirou!! Clique em ok e acesse novamente"); 
            this._router.navigate(["/"]);
          })
  }

  selecionarMusica(item){
    this.musicaSelecionada = item.preview_url; 
  }

  voltar(){
    this._router.navigate(["albums/"]);
  }

}
