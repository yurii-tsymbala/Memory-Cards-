import { Component } from '@angular/core';
import { Level } from 'src/app/models/Level';
import { LevelCellComponent } from '../level-cell/level-cell.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LevelService } from 'src/app/services/level.service';

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

  constructor(private levelService: LevelService) {
    this.levelCells = this.levelService.levelCells;
  }
}
