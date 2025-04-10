import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '@memoryMatchGame/services';
import { ThemeService } from '@memoryMatchGame/services';
import { generateColorPalette } from '@memoryMatchGame/utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="w-full p-4 flex justify-between items-center shadow-md"
      [style.backgroundColor]="'rgba(var(--color-primary-rgb), 0.1)'"
      [dir]="translation.currentLanguage === 'fa' ? 'rtl' : 'ltr'"
    >
      <div class="flex items-center space-x-4">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          {{ translation.t('welcomeMessage') }}
        </h1>
      </div>

      <div class="flex items-center space-x-4">
        <button
          (click)="themeService.toggleDarkMode()"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            *ngIf="themeService.isDarkMode"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            *ngIf="!themeService.isDarkMode"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <button
          (click)="isMenuOpen = !isMenuOpen"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            *ngIf="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            *ngIf="isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        *ngIf="isMenuOpen"
        class="absolute top-16 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50"
        [dir]="translation.currentLanguage === 'fa' ? 'rtl' : 'ltr'"
      >
        <div class="space-y-4">
          <!-- Color Palette -->
          <div class="space-y-2">
            <span class="text-gray-600 dark:text-gray-300">
              {{ translation.t('colorPalette') }}
            </span>
            <div class="flex flex-wrap gap-2">
              <button
                *ngFor="let color of colors"
                (click)="handleColorChange(color)"
                class="w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                [style.backgroundColor]="color"
                [title]="color"
              ></button>
            </div>
          </div>

          <!-- Language -->
          <div class="space-y-2">
            <span class="text-gray-600 dark:text-gray-300">
              {{ translation.t('language') }}
            </span>
            <select
              [value]="translation.currentLanguage"
              (change)="setLanguage($event)"
              class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="en">{{ translation.t('english') }}</option>
              <option value="fa">{{ translation.t('persian') }}</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  isMenuOpen = false;
  colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  constructor(
    public translation: TranslationService,
    public themeService: ThemeService
  ) {}

  handleColorChange(color: string) {
    const theme = generateColorPalette(color);
    this.themeService.setTheme(theme);
  }

  setLanguage(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.translation.setLanguage(select.value as 'en' | 'fa');
  }
}
