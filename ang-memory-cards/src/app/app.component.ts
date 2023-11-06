import { Component, OnInit } from '@angular/core';
import { Card } from './model/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  cardCells: Card[] = [];
  columsCount: number = 3;

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
      new Card('frog')
    ];
  }
}
