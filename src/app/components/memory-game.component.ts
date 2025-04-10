import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '@memoryMatchGame/services';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
      <div class="mb-8 flex items-center gap-4">
        <div class="text-2xl font-bold">
          {{ translation.t('time') }}: {{ formatTime(time) }}
        </div>
        <button
          (click)="resetGame()"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          {{ translation.t('resetGame') }}
        </button>
      </div>

      <div
        class="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        [@cardsAnimation]
      >
        <div
          *ngFor="let card of cards"
          (click)="flipCard(card)"
          class="relative cursor-pointer"
          [class.flipped]="card.isFlipped"
          [class.matched]="card.isMatched"
        >
          <div
            class="card-inner w-24 h-32 rounded-lg shadow-lg transition-transform duration-500"
            [style.transform]="
              card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
            "
          >
            <div
              class="card-front absolute w-full h-full bg-primary text-white flex items-center justify-center text-4xl rounded-lg backface-hidden"
            >
              ?
            </div>
            <div
              class="card-back absolute w-full h-full bg-white flex items-center justify-center text-4xl rounded-lg backface-hidden"
              [style.transform]="'rotateY(180deg)'"
            >
              {{ card.value }}
            </div>
          </div>
        </div>
      </div>

      <!-- Win/Lose Modal -->
      <div
        *ngIf="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        [@modalAnimation]
      >
        <div
          class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center"
        >
          <h2 class="text-3xl font-bold mb-4">
            {{ isWinner ? translation.t('youWon') : translation.t('youLost') }}
          </h2>
          <p class="text-xl mb-4">
            {{ translation.t('finalScore') }}: {{ formatTime(time) }}
          </p>
          <button
            (click)="resetGame()"
            class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            {{ translation.t('playAgain') }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card-inner {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
      }
    `,
  ],
  animations: [
    trigger('cardsAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.5)' })),
      transition(':enter', [
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.5)' })),
      transition(':enter', [
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'scale(0.5)' })),
      ]),
    ]),
  ],
})
export class MemoryGameComponent implements OnInit, OnDestroy {
  public translation = inject(TranslationService);
  cards: Card[] = [];
  time = 0;
  timer: any;
  showModal = false;
  isWinner = false;
  flippedCards: Card[] = [];
  matchedPairs = 0;

  ngOnInit() {
    this.resetGame();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  resetGame() {
    this.cards = [];
    this.time = 0;
    this.showModal = false;
    this.matchedPairs = 0;
    this.flippedCards = [];

    // Create pairs of cards
    const values = Array.from({ length: 6 }, (_, i) => i + 1);
    const pairs = [...values, ...values];

    // Shuffle cards
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    // Create card objects
    this.cards = pairs.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    // Start timer
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.time++;
      this.checkGameStatus();
    }, 1000);
  }

  flipCard(card: Card) {
    if (this.flippedCards.length >= 2 || card.isFlipped || card.isMatched) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      const [card1, card2] = this.flippedCards;

      if (card1.value === card2.value) {
        card1.isMatched = true;
        card2.isMatched = true;
        this.matchedPairs++;
        this.flippedCards = [];
      } else {
        setTimeout(() => {
          card1.isFlipped = false;
          card2.isFlipped = false;
          this.flippedCards = [];
        }, 1000);
      }
    }
  }

  checkGameStatus() {
    if (this.matchedPairs === 6) {
      clearInterval(this.timer);
      this.isWinner = this.time <= 60;
      this.showModal = true;
    } else if (this.time >= 180) {
      clearInterval(this.timer);
      this.isWinner = false;
      this.showModal = true;
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
