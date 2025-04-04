import { Component, inject, Input, signal } from '@angular/core';
import { Photo } from '../../types/photos';
import { Store } from '@ngrx/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/actions/favorites.action';
import { take } from 'rxjs';
import { FavoritesState } from '../../store/reducers/favorites.reducer';
import { MatDialog } from '@angular/material/dialog';
import { PhotoViewDialogComponent } from '../photo-view-dialog/photo-view-dialog.component';

@Component({
  selector: 'app-photo-gallery-tile',
  standalone: false,
  templateUrl: './photo-gallery-tile.component.html',
  styleUrl: './photo-gallery-tile.component.scss',
})
export class PhotoGalleryTileComponent {
  @Input() photo!: Photo;
  liked = signal(false);
  showMenu = signal(false);
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(PhotoViewDialogComponent, {
      width: '70rem',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { photo: this.photo },
    });
  }

  constructor(
    private favoritesStore: Store<{ favorites: { photoIds: number[] } }>
  ) {}

  likeOrDislikePhoto() {
    this.favoritesStore
      .select('favorites')
      .pipe(take(1))
      .subscribe((state) => {
        if (state.photoIds.includes(this.photo.id)) {
          this.favoritesStore.dispatch(
            removeFromFavorites({ photoId: this.photo.id })
          );
        } else {
          this.favoritesStore.dispatch(
            addToFavorites({ photoId: this.photo.id })
          );
        }
      });
  }

  onMouseLeave(ev: MouseEvent) {
    this.showMenu.set(false);
  }
  onMouseEnter(ev: MouseEvent) {
    this.showMenu.set(true);
  }

  onMouseMove(ev: MouseEvent) {}

  ngOnInit() {
    this.favoritesStore
      .select('favorites')
      .subscribe((state: FavoritesState) => {
        this.liked.set(state.photoIds.includes(this.photo.id));
      });
  }
}
