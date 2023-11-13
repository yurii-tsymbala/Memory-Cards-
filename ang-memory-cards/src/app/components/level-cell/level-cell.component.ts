import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Level } from 'src/app/model/Level';

@Component({
  standalone: true,
  selector: 'level-cell',
  templateUrl: './level-cell.component.html',
  styleUrls: ['./level-cell.component.css'],
  imports: [CommonModule, RouterLink]
})
export class LevelCellComponent {
  @Input() level!: Level;
  @Output() launchGameLevel = new EventEmitter<number>();

  launchGame() {    
    this.launchGameLevel.emit(this.level.cardsAmount);
  }
}
