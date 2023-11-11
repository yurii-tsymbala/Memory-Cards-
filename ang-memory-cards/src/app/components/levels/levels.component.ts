import { Component } from '@angular/core';
import { Level } from 'src/app/model/Level';
import { LevelCellComponent } from '../level-cell/level-cell.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'levels',
  templateUrl: './levels.component.html',
  imports: [ LevelCellComponent, CommonModule, RouterLink]
})
export class LevelsComponent {
  columsCount: number = 3;
  levelCells: Level[] = [];

  constructor() { this.generateLevels() }

  generateLevels() {
    this.levelCells = [
      new Level(4),
      new Level(6),
      new Level(8),
      new Level(12),
      new Level(16),
      new Level(18),
    ];
  }
}
