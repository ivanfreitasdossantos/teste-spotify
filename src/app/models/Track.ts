import { Album } from './Album';
import { Imagem } from './Imagem';

export class Track {
  id: number;
  name: string;
  genres: any;
  albums: Album[];
  images: Imagem[];
  items: Track[];

}
