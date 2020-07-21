import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  album: any;
  albumId: any;
  query:any;

  constructor( 
    private _spotifyService: SpotifyService,
    private _route: ActivatedRoute,
    private _router: Router) {

    }

  ngOnInit(): void {

    this.albumId  = this._route.snapshot.paramMap.get('id')
    console.log("id album");
    console.log(this._route.snapshot.paramMap);


    this._spotifyService.getAuth()
      .subscribe((res:any) => { this._spotifyService.getAlbum(this.albumId, res.access_token)
        .subscribe(
          (res:any) => {   
            console.log(res)
            this.album = res
          })
        }
    );
  }


  voltar(){
    this._router.navigate(["busca/"]);
  }

}
