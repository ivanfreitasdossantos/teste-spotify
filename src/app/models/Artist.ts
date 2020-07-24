import { Album } from './Album';
import { Imagem } from './Imagem';

export class Artist {
  id: number;
  name: string;
  genres: any;
  albums: Album[];
  images: Imagem[];

}
