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
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-view-dialog',
  standalone: false,
  templateUrl: './photo-view-dialog.component.html',
  styleUrl: './photo-view-dialog.component.scss',
})
export class PhotoViewDialogComponent {
  photo = signal<Photo>({} as Photo);
  liked = signal(false);
  safeImageUrl: SafeUrl | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private favoritesStore: Store<{ favorites: { photoIds: number[] } }>,
    private http: HttpClient,
    private sanitizer: DomSanitizer
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

  downloadPhoto() {
    this.http.get(this.photo().url, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = this.photo().title || 'pobrany_obraz';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania obrazka:', error);
      }
    );
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
