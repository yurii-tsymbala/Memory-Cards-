import { Injectable } from '@angular/core';
import { Level } from '../models/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  levelCells: Level[] = [];

  constructor() {
    this.createLevels();
  }

  getLevel(cardsAmount: number) {
    return this.levelCells.find( level => level.cardsAmount === cardsAmount) ?? this.levelCells[5];
  }

  getNextLevel(currentlevel: Level) {
   let currentLevelId = this.levelCells.findIndex( level => level === currentlevel);
   this.levelCells[currentLevelId+1].isOpened = true;
   return this.levelCells[currentLevelId+1] ?? this.levelCells[5];
  }

  createLevels() {
    this.levelCells = [
      new Level(2, 2, true),
      new Level(2, 3),
      new Level(3, 4),
      new Level(4, 4),
      new Level(4, 5),
      new Level(5, 6),
      new Level(6, 6),
      new Level(7, 6),
      new Level(8, 6),
    ];
  }

}
