import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGalleryTileSkeletonComponent } from './photo-gallery-tile-skeleton.component';

describe('PhotoGalleryTileSkeletonComponent', () => {
  let component: PhotoGalleryTileSkeletonComponent;
  let fixture: ComponentFixture<PhotoGalleryTileSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoGalleryTileSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGalleryTileSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
