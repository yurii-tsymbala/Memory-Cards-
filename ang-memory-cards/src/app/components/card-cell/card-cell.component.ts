import { CommonModule} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/Card';

@Component({
  standalone: true,
  selector: 'card-cell',
  templateUrl: './card-cell.component.html',
  styleUrls: ['./card-cell.component.css'],
  imports: [CommonModule],
})
export class CardCellComponent {
  @Input() card!: Card;
  @Input() cardIndex!: number;
  @Output() flippedCardIndex = new EventEmitter<number>();

  toggleFlip() {
    this.card.isFlipped = !this.card.isFlipped;
    this.flippedCardIndex.emit(this.cardIndex);
  }
}
