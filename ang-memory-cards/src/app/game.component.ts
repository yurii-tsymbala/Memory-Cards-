import { Component } from '@angular/core';
import { Card } from './model/Card';

@Component({
  selector: 'app-root',
  templateUrl: './game.component.html'
})

export class GameComponent {
  columsCount: number = 3;
  cardCells: Card[] = [];
  firstFlippedIndex = -1;
  secondFlippedIndex = -1;

  constructor() {
    this.generateCards(12);
  }

  getRandomAssets(assetsArray: string[], cardsAmount: number) {
    const shuffled = [...assetsArray].sort(() => 0.5 - Math.random()).slice(0, cardsAmount);
    const merged = shuffled.concat(shuffled.reverse()).sort(() => 0.5 - Math.random());
    return merged
  }
  
  generateCards(level: number) {
    const cardsAmount = level / 2;
    const assetsArray = ['chameleon', 'chick', 'crab', 'elephant', 'frog','jellyfish', 'penguin', 'sea-turtle']; // range 4-16 cards
    const randomAssets = this.getRandomAssets(assetsArray, cardsAmount);
    this.cardCells = randomAssets.map( asset => new Card(asset));
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
      console.log('Match!');
      this.firstFlippedIndex = -1;
      this.checkGameOver();
    } else {
      console.log('No Match!');
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
      console.log('Victory! Congrats =)');
    }
  }
}
