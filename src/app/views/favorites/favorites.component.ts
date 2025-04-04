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
  pageIndex = signal(1);
  photosPerPage = signal(9);
  loading = signal(true);

  ngOnInit() {
    this.fetchPhotos();
  }

  changedPage(event: PageEvent) {
    this.pageIndex.update(() => event.pageIndex + 1);
    if (event.pageSize !== this.photosPerPage())
      this.photosPerPage.update(() => event.pageSize);
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
      toArray(),
      tap((d) => console.log(d))
    );
  }

  fetchPhotos() {
    this.downloadPhotos().subscribe((photos: any) => {
      this.photos = photos;
      this.loading.set(false);
    });
  }
}
