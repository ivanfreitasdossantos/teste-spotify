import { TestBed, inject } from '@angular/core/testing';

import { SpotifyService } from './spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

describe('SpotifyService', () => {
  let service = SpotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, LocalStorageService],
      providers:[SpotifyService]
    });
  });

/*   it('pode ser  inicializado', inject([SpotifyService], (spotifyService: SpotifyService) => {
    expect(service).toBeTruthy();
  })); */

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
