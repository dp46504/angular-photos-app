import { Component, Inject, signal } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites-snack-bar',
  standalone: false,
  templateUrl: './favorites-snack-bar.component.html',
  styleUrl: './favorites-snack-bar.component.scss',
})
export class FavoritesSnackBarComponent {
  message = signal<string>('');
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message.set(data.message);
  }
}
