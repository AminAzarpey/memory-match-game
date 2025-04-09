import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ThemeService} from './services/theme.service';
import {NgClass} from '@angular/common';
import {TranslationService} from '@memoryMatchGame/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'memory-match-game';
  constructor(public themeService: ThemeService,public translation: TranslationService) {}

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
