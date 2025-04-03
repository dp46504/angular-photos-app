import { Component, input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMode } from '../../store/actions/theme.actions';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerText = input('Photos Demo App');
  checked = signal(false);
  theme$: Observable<boolean>;

  constructor(private store: Store<{ theme: boolean }>) {
    this.theme$ = store.select('theme');

    this.theme$.subscribe((theme) => {
      this.checked.update(() => theme);
      document.documentElement.style.setProperty(
        'color-scheme',
        theme ? 'light' : 'dark'
      );
    });
  }

  switchTheme() {
    this.store.dispatch(switchMode());
  }
}
