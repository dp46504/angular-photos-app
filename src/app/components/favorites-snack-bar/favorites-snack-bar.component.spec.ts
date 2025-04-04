import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesSnackBarComponent } from './favorites-snack-bar.component';

describe('FavoritesSnackBarComponent', () => {
  let component: FavoritesSnackBarComponent;
  let fixture: ComponentFixture<FavoritesSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesSnackBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
