import { Component, ViewChild, inject } from '@angular/core';
import { Card } from '../../models/Card';
import { CardCellComponent } from '../card-cell/card-cell.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { Level } from 'src/app/models/Level';
import { LevelService } from 'src/app/services/level.service';

@Component({
  standalone: true,
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule, CardCellComponent, PopupComponent, RouterModule],
})
export class GameComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  currentLevel!: Level;
  columsCount: number = 3;
  cardCells: Card[] = [];
  firstFlippedIndex: number = -1;
  secondFlippedIndex: number = -1;

  @ViewChild('popup', { static: false }) popup!: PopupComponent;

  constructor(private levelService: LevelService) {  
    this.currentLevel = levelService.getLevel(Number(this.route.snapshot.params['id']));
    this.generateCards(this.currentLevel);
  }

  nextLevel() {
    this.generateCards(this.currentLevel);
  }

  generateCards(level: Level) {
    this.columsCount = level.col;
    const assetsArray = [
      'chameleon',
      'chick',
      'crab',
      'elephant',
      'frog',
      'jellyfish',
      'penguin',
      'sea-turtle',
      'butterfly',
      'rabbit',
      'crocodile',
      'owl',
      'squirrel',
      'snail',
      'squirrel',
      'pig',
    ];

    const randomAssets = this.getRandomAssets(
      assetsArray,
      level.cardsAmount / 2
    );
    this.cardCells = randomAssets.map((asset) => new Card(asset));
  }

  getRandomAssets(assetsArray: string[], cardsAmount: number) {
    const shuffled = [...assetsArray]
      .sort(() => 0.5 - Math.random())
      .slice(0, cardsAmount);
    const merged = shuffled
      .concat(shuffled.reverse())
      .sort(() => 0.5 - Math.random());
    return merged;
  }

  onCardClick(index: number) {
    if (this.firstFlippedIndex === -1) {
      this.firstFlippedIndex = index;
      this.cardCells[index].isEnabled = false;
      return;
    }
    this.secondFlippedIndex = index;

    for (const card of this.cardCells) {
      card.isEnabled = false;
    }
    setTimeout(this.checkMatch, 900);
  }

  checkMatch = () => {
    const firstFlippedCard = this.cardCells[this.firstFlippedIndex];
    const secondFlippedCard = this.cardCells[this.secondFlippedIndex];

    if (firstFlippedCard.imgName === secondFlippedCard.imgName) {
      this.firstFlippedIndex = -1;
      this.checkGameOver();
    } else {
      firstFlippedCard.isFlipped = false;
      secondFlippedCard.isFlipped = false;
      this.firstFlippedIndex = -1;
    }

    for (const card of this.cardCells) {
      card.isEnabled = !card.isFlipped;
    }
  };

  checkGameOver() {
    const unflippedCards = this.cardCells.filter((card) => !card.isFlipped);
    if (unflippedCards.length > 0) {
      return;
    } else {
      const nextLevel = this.levelService.getNextLevel(this.currentLevel);
      this.currentLevel = nextLevel;
      this.popup.open();
    }
  }
}
