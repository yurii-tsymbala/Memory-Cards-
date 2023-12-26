import { Component, ViewChild, inject } from '@angular/core';
import { Card } from '../../models/Card';
import { CardCellComponent } from '../card-cell/card-cell.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { Level } from 'src/app/models/Level';
import { LevelService } from 'src/app/services/level.service';
import { CardService } from 'src/app/services/card.service';
import { getGridCellSize } from 'src/app/utils';

@Component({
  standalone: true,
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule, CardCellComponent, PopupComponent, RouterModule],
})
export class GameComponent {
  currentLevel!: Level;
  columsCount: number = 3;
  cardSize: string = '10rem';
  cardCells: Card[] = [];

  @ViewChild('popup', { static: false }) popup!: PopupComponent;

  constructor(
    private levelService: LevelService,
    private cardService: CardService,
    private route: ActivatedRoute,
  ) {
    this.currentLevel = this.levelService.getLevel(
      Number(this.route.snapshot.params['id'])
    );
    this.columsCount = this.currentLevel.col;

    this.cardCells = this.cardService.generateCards(this.currentLevel);
    cardService.cardsUpdate = (cards) => {
      this.cardCells = cards;
    };
    cardService.gameOver = () => {
      const nextLevel = this.levelService.getNextLevel(this.currentLevel);
      this.currentLevel = nextLevel;
      this.popup.open();
    };

    window.addEventListener('resize', this.updateCardSize);
    this.updateCardSize();
  }

  updateCardSize = () => {
    this.cardSize = getGridCellSize(
      this.currentLevel.col,
      this.currentLevel.row
    );
  };

  nextLevel() {
    this.updateCardSize();
    this.columsCount = this.currentLevel.col;
    this.cardCells = this.cardService.generateCards(this.currentLevel);
  }

  onCardClick(index: number) {
    this.cardService.onCardClick(index);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateCardSize);
  }
}
