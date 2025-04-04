import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { PhotoGalleryTileComponent } from './components/photo-gallery-tile/photo-gallery-tile.component';
import { provideHttpClient } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { themeReducer } from './store/reducers/theme.reducer';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { FavoritesComponent } from './views/favorites/favorites.component';
import { favoritesReducer } from './store/reducers/favorites.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PhotoViewDialogComponent } from './components/photo-view-dialog/photo-view-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FavoritesSnackBarComponent } from './components/favorites-snack-bar/favorites-snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    FooterComponent,
    PhotoGalleryTileComponent,
    FavoritesComponent,
    PhotoViewDialogComponent,
    FavoritesSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIconModule,
    StoreModule.forRoot(
      { theme: themeReducer, favorites: favoritesReducer },
      {}
    ),
    EffectsModule.forRoot([]),
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
