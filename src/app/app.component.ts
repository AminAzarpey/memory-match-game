import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { TranslationService } from '@memoryMatchGame/services';
import { HeaderComponent } from './components/header.component';
import { MemoryGameComponent } from './components/memory-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MemoryGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'memory-match-game';

  constructor(
    public themeService: ThemeService,
    public translation: TranslationService
  ) {}

  ngOnInit() {
    this.translation.language$.subscribe((lang) => {
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    });
  }
}
