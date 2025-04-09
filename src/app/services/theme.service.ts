import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '@memoryMatchGame/types';
import { applyTheme, defaultTheme } from '@memoryMatchGame/utils';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  private themeSubject = new BehaviorSubject<Theme>(defaultTheme);

  isDarkMode$ = this.isDarkModeSubject.asObservable();
  theme$ = this.themeSubject.asObservable();

  constructor() {
    const storedMode = localStorage.getItem('dark-mode');
    if (storedMode === 'true') {
      this.setDarkMode(true);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        this.setTheme(theme);
      } catch (e) {
        this.setTheme(defaultTheme);
      }
    } else {
      this.setTheme(defaultTheme);
    }
  }

  toggleDarkMode(): void {
    const current = !this.isDarkModeSubject.getValue();
    this.setDarkMode(current);
  }

  private setDarkMode(enabled: boolean): void {
    this.isDarkModeSubject.next(enabled);
    localStorage.setItem('dark-mode', String(enabled));
    document.documentElement.classList.toggle('dark', enabled);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', JSON.stringify(theme));
    applyTheme(theme);
  }

  get currentTheme(): Theme {
    return this.themeSubject.getValue();
  }

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.getValue();
  }
}
