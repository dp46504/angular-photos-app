import { Component, Input, signal } from '@angular/core';
import { Photo } from '../../types/photos';

@Component({
  selector: 'app-photo-gallery-tile',
  standalone: false,
  templateUrl: './photo-gallery-tile.component.html',
  styleUrl: './photo-gallery-tile.component.scss',
})
export class PhotoGalleryTileComponent {
  @Input() photo!: Photo;

  showMenu = signal(false);

  onMouseLeave(ev: MouseEvent) {
    this.showMenu.set(false);
  }
  onMouseEnter(ev: MouseEvent) {
    this.showMenu.set(true);

    let t = ev.target as HTMLElement;
  }

  onMouseMove(ev: MouseEvent) {}
}
