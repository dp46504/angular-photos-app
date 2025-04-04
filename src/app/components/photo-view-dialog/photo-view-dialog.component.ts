import { Component, inject, Inject, Input, signal } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesSnackBarComponent } from '../favorites-snack-bar/favorites-snack-bar.component';

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
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 3;

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

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(FavoritesSnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message },
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
          this.openSnackBar('Removed from favorites');
        } else {
          this.favoritesStore.dispatch(
            addToFavorites({ photoId: this.photo().id })
          );
          this.openSnackBar('Added to favorites');
        }
      });
  }
}
