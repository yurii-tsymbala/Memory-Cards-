import { Component } from '@angular/core';
import { Level } from 'src/app/model/Level';
import { LevelCellComponent } from '../level-cell/level-cell.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css'],
  imports: [LevelCellComponent, CommonModule, RouterLink],
})
export class LevelsComponent {
  columsCount: number = 3;
  levelCells: Level[] = [];

  constructor() {
    this.generateLevels();
  }

  generateLevels() {
    this.levelCells = [
      new Level(2, 2),
      new Level(2, 3),
      new Level(3, 4),
      new Level(4, 3),
      new Level(4, 4),
      new Level(4, 5),
      new Level(4, 4),
      new Level(5, 6),
      new Level(6, 6),
    ];
  }
}
