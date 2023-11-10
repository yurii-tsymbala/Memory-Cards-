import { Component, OnChanges, OnInit } from '@angular/core';
import { Card } from './model/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnChanges {
  columsCount: number = 3;
  cardCells: Card[] = [];
  firstFlippedIndex = -1;
  secondFlippedIndex = -1;

  ngOnInit(): void {
    this.cardCells = [
      new Card('penguin'),
      new Card('crab'),
      new Card('jellyfish'),
      new Card('chick'),
      new Card('frog'),
      new Card('chick'),
      new Card('elephant'),
      new Card('penguin'),
      new Card('elephant'),
      new Card('jellyfish'),
      new Card('crab'),
      new Card('frog'),
    ];
  }

  ngOnChanges(): void {
    console.log(this.cardCells);
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

  checkMatch = () =>  { 
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
  }

  checkGameOver() {
    const unflippedCards = this.cardCells.filter((card) => !card.isFlipped);
    if (unflippedCards.length > 0) {
      return;
    } else {
      console.log('Victory! Congrats =)');
    }
  }
}
