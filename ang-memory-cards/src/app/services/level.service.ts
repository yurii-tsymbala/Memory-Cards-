import { Injectable } from '@angular/core';
import { Level } from '../models/Level';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  levelCells: Level[] = [];

  constructor() {
    this.fetchLevels();
  }

  getLevel(cardsAmount: number): Level {
    return (
      this.levelCells.find((level) => level.cardsAmount === cardsAmount) ??
      this.levelCells[this.levelCells.length]
    );
  }

  getNextLevel(currentlevel: Level) {
    let currentLevelId = this.levelCells.findIndex(
      (level) => level === currentlevel
    );
    this.levelCells[currentLevelId + 1].isOpened = true;
    this.saveLevels();
    return (
      this.levelCells[currentLevelId + 1] ??
      this.levelCells[this.levelCells.length]
    );
  }

  saveLevels() {
    let savedLevels = JSON.stringify(this.levelCells);
    localStorage.clear();
    localStorage.setItem('levels', savedLevels);
  }

  fetchLevels() {
    if (localStorage.getItem('levels')) {
      const levelsData: any[] = JSON.parse(window.localStorage.getItem('levels')!);    

      this.levelCells = levelsData.map(
          (data) => new Level(data.row, data.col,true)
      );
    } else {
      this.createLevels();
      this.saveLevels();
    }
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
