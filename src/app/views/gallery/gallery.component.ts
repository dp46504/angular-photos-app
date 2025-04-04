import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Photo } from '../../types/photos';
import { delay, finalize, map, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  constructor(
    private http: HttpClient,
    private favoritesStore: Store<{ favorites: { photoIds: number[] } }>
  ) {}
  photos: Photo[] = [];
  pageIndex = signal(1);
  photosPerPage = signal(9);
  loading = signal(true);
  totalQuantityOfPhotos = 100;

  changedPage(event: PageEvent) {
    this.pageIndex.update(() => event.pageIndex + 1);
    if (event.pageSize !== this.photosPerPage())
      this.photosPerPage.update(() => event.pageSize);
    this.fetchPhotos();
  }

  downloadPhotos(): Observable<Photo[]> {
    this.loading.set(true);

    return this.http
      .get<any>(
        `https://api.slingacademy.com/v1/sample-data/photos?offset=${
          (this.pageIndex() - 1) * this.photosPerPage()
        }&limit=${this.photosPerPage()}`
      )
      .pipe(
        map((response) => response.photos as Photo[]),
        finalize(() => this.loading.set(false))
      );
  }

  fetchPhotos() {
    this.downloadPhotos().subscribe((photos) => {
      this.photos = photos;
    });
  }

  ngOnInit() {
    this.fetchPhotos();
  }
}
