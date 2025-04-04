import { Component, Inject, Input, signal } from '@angular/core';
import { Photo } from '../../types/photos';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/actions/favorites.action';
import { FavoritesState } from '../../store/reducers/favorites.reducer';

@Component({
  selector: 'app-photo-view-dialog',
  standalone: false,
  templateUrl: './photo-view-dialog.component.html',
  styleUrl: './photo-view-dialog.component.scss',
})
export class PhotoViewDialogComponent {
  photo = signal<Photo>({} as Photo);
  liked = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private favoritesStore: Store<{ favorites: { photoIds: number[] } }>
  ) {
    this.photo.set(data.photo);
  }

  ngOnInit() {
    this.favoritesStore
      .select('favorites')
      .subscribe((state: FavoritesState) => {
        this.liked.set(state.photoIds.includes(this.photo().id));
      });
  }

  likeOrDislikePhoto() {
    this.favoritesStore
      .select('favorites')
      .pipe(take(1))
      .subscribe((state) => {
        if (state.photoIds.includes(this.photo().id)) {
          this.favoritesStore.dispatch(
            removeFromFavorites({ photoId: this.photo().id })
          );
        } else {
          this.favoritesStore.dispatch(
            addToFavorites({ photoId: this.photo().id })
          );
        }
      });
  }
}
