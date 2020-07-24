import { Imagem } from './Imagem';
import { Artist } from './Artist';
import { Track } from './Track';

export class Album {
  id: number;
  name: String;
  images: Imagem[];
  artists: Artist[];
  tracks: Track[];
}
