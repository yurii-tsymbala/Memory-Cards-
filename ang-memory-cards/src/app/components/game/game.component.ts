import { Component, ViewChild, inject } from '@angular/core';
import { Card } from '../../models/Card';
import { CardCellComponent } from '../card-cell/card-cell.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { Level } from 'src/app/models/Level';
import { LevelService } from 'src/app/services/level.service';
import { CardService } from 'src/app/services/card.service';

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
  cardSize: string = "10rem";
  cardCells: Card[] = [];

  @ViewChild('popup', { static: false }) popup!: PopupComponent;

  constructor(
    private levelService: LevelService,
    private cardService: CardService
  ) {
    this.currentLevel = this.levelService.getLevel(Number(this.route.snapshot.params['id']));
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

    this.updateCardSize();
  }

  updateCardSize(){
    const cardsCount =  this.currentLevel.cardsAmount;

    if(cardsCount<= 12){
      this.cardSize  = "10rem";
    }else if(cardsCount<= 30){
      this.cardSize  = "8rem";
    }else{
      this.cardSize  = "7rem";
    }
  }

  nextLevel() {
    this.updateCardSize();
    this.columsCount = this.currentLevel.col;
    this.cardCells = this.cardService.generateCards(this.currentLevel);
  }

  onCardClick(index: number) {
    this.cardService.onCardClick(index);
  }
}
