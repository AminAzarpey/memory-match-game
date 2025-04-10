import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { TranslationService } from '@memoryMatchGame/services';
import { HeaderComponent } from './components/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'memory-match-game';
  constructor(
    public themeService: ThemeService,
    public translation: TranslationService
  ) {}
}
