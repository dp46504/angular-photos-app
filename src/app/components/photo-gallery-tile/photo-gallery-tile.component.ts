import { Component, Input, input } from '@angular/core';
import { Photo } from '../../types/photos';

@Component({
  selector: 'app-photo-gallery-tile',
  standalone: false,
  templateUrl: './photo-gallery-tile.component.html',
  styleUrl: './photo-gallery-tile.component.scss',
})
export class PhotoGalleryTileComponent {
  @Input() photo!: Photo;
}
