import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Language = 'en' | 'fa';

export type TranslationKeys = keyof typeof translations.en;

const translations = {
  en: {
    title: 'Memory Match',
    welcomeMessage: 'Welcome to Memory Match!',
    selectChoice: 'Select your choice',
    time:'Time',
    result: 'Result: ',
    win: 'You win!',
    lose: 'You lose!',
    tie: "It's a tie!",
    reset: 'Restart Game',
    english: 'English',
    persian: 'Persian',
    colorPalette: 'Color Palette',
    language: 'Language',
    memoryMatchGame: 'Memory Match',
    score: 'Score',
    makeYourChoice: 'Make your choice',
    gameHistory: 'Game History',
    round: 'Round',
    congratulations: 'Congratulations!',
    finalScore: 'Final Score',
    wins: 'Wins',
    losses: 'Losses',
    draws: 'Draws',
    playAgain: 'Play Again',
    selectGameMode: 'Select Game Mode',
    resetGame: 'Reset Game',
    gameOver: 'Game Over',
    youWon: 'You Won!',
    youLost: 'You Lost!',
    itsATie: "It's a Tie!",
    player: 'Player',
    computer: 'Computer',
    roundResult: 'Round Result',
    continue: 'Continue',
    close: 'Close',
  },
  fa: {
    title: 'بازی حافظه',
    welcomeMessage: 'به بازی حافظه خوش آمدید!',
    selectChoice: 'انتخاب خود را انجام دهید',
    time:'زمان',
    result: 'نتیجه: ',
    win: 'شما برنده شدید!',
    lose: 'شما باختید!',
    tie: 'مساوی شد!',
    reset: 'شروع مجدد بازی',
    english: 'انگلیسی',
    persian: 'فارسی',
    colorPalette: 'پالت رنگ',
    language: 'زبان',
    memoryMatchGame: 'بازی حافظه',
    score: 'امتیاز',
    makeYourChoice: 'انتخاب خود را انجام دهید',
    gameHistory: 'تاریخچه بازی',
    round: 'دور',
    congratulations: 'تبریک!',
    finalScore: 'امتیاز نهایی',
    wins: 'بردها',
    losses: 'باخت‌ها',
    draws: 'مساوی‌ها',
    playAgain: 'بازی مجدد',
    selectGameMode: 'انتخاب حالت بازی',
    resetGame: 'شروع مجدد',
    gameOver: 'بازی تمام شد',
    youWon: 'شما برنده شدید!',
    youLost: 'شما باختید!',
    itsATie: 'مساوی شد!',
    player: 'بازیکن',
    computer: 'کامپیوتر',
    roundResult: 'نتیجه دور',
    continue: 'ادامه',
    close: 'بستن',
  },
} as const;

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly STORAGE_KEY = 'language-storage';
  private languageSubject = new BehaviorSubject<Language>(this.getStoredLanguage());

  language$ = this.languageSubject.asObservable();

  private getStoredLanguage(): Language {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'fa' ? 'fa' : 'en';
  }

  setLanguage(lang: Language) {
    this.languageSubject.next(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  get currentLanguage(): Language {
    return this.languageSubject.getValue();
  }

  t(key: TranslationKeys): string {
    return translations[this.currentLanguage][key] || key;
  }
}
