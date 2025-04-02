import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Photo } from '../../types/photos';
import { delay, finalize, map, Observable } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  constructor(private http: HttpClient) {}
  photos: Photo[] = [];
  pageIndex = signal(1);
  photosPerPage = 9;
  loading = signal(true);

  plusPage() {
    this.pageIndex.update((prev) => {
      return prev + 1;
    });
    this.fetchPhotos();
  }

  minusPage() {
    let flag = false;
    this.pageIndex.update((prev) => {
      if (prev > 1) {
        flag = true;
        return prev - 1;
      }
      return prev;
    });
    if (flag) this.fetchPhotos();
  }

  downloadPhotos(): Observable<Photo[]> {
    this.loading.set(true);

    return this.http
      .get<any>(
        `https://api.slingacademy.com/v1/sample-data/photos?offset=${
          (this.pageIndex() - 1) * this.photosPerPage
        }&limit=${this.photosPerPage}`
      )
      .pipe(
        delay(1000),
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
