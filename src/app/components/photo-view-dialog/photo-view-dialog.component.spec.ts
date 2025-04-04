import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewDialogComponent } from './photo-view-dialog.component';

describe('PhotoViewDialogComponent', () => {
  let component: PhotoViewDialogComponent;
  let fixture: ComponentFixture<PhotoViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
