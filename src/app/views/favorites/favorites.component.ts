import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Photo } from '../../types/photos';
import { PageEvent } from '@angular/material/paginator';
import {
  catchError,
  delay,
  finalize,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  take,
  tap,
  toArray,
} from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  constructor(
    private http: HttpClient,
    private favoritesStore: Store<{ favorites: { photoIds: number[] } }>
  ) {
    favoritesStore
      .select((state: any) => state.favorites.photoIds)
      .subscribe((ids: number[]) => {
        this.fetchPhotos();
      });

    this.photoIdsArray$ = favoritesStore
      .select((state) => state.favorites.photoIds)
      .pipe(take(1));
  }

  photoIdsArray$: Observable<number[]>;

  photos: Photo[] = [];
  loading = signal(true);

  ngOnInit() {
    this.fetchPhotos();
  }

  downloadPhotos(): Observable<Photo[]> {
    this.loading.set(true);

    return this.photoIdsArray$.pipe(
      mergeMap((ids) => from(ids)),
      mergeMap((id) =>
        this.http.get<any>(
          `https://api.slingacademy.com/v1/sample-data/photos/${id}`
        )
      ),
      map((res) => res.photo),
      toArray()
    );
  }

  fetchPhotos() {
    this.downloadPhotos().subscribe((photos: any) => {
      this.photos = photos;
      this.loading.set(false);
    });
  }
}
