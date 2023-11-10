import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/model/Card';

@Component({
  selector: 'card-cell',
  templateUrl: './card-cell.component.html',
  animations: [
    trigger('isFlipped', [
      state(
        'true',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      state(
        'false',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in')),
    ]),
  ],
})
export class CardCellComponent {
  @Input() card!: Card;
  @Input() cardIndex!: number;
  @Output() flippedCardIndex = new EventEmitter<number>();

  ngOnInit(): void {}

  toggleFlip() {
    this.card.isFlipped = !this.card.isFlipped;
    this.flippedCardIndex.emit(this.cardIndex);
  }

  animationStarted(event: any) {}

  animationDone(event: any) {}
}
