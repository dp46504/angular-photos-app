import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGalleryTileComponent } from './photo-gallery-tile.component';

describe('PhotoGalleryTileComponent', () => {
  let component: PhotoGalleryTileComponent;
  let fixture: ComponentFixture<PhotoGalleryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoGalleryTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGalleryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
