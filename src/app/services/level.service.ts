import { Injectable } from '@angular/core';
import { Level } from '../models/Level';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  levelCells = new BehaviorSubject<Level[]>([]);

  constructor() {
    this.fetchLevels();
  }

  getLevel(cardsAmount: number): Level {
    return (
      this.levelCells.getValue().find((level) => level.cardsAmount === cardsAmount) ??
      this.levelCells.getValue()[this.levelCells.getValue().length]
    );
  }

  getNextLevel(currentlevel: Level) {
    let currentLevelId = this.levelCells.getValue().findIndex(
      (level) => level === currentlevel
    );
    this.levelCells.getValue()[currentLevelId + 1].isOpened = true;
    this.saveLevels();
    return (
      this.levelCells.getValue()[currentLevelId + 1] ??
      this.levelCells.getValue()[this.levelCells.getValue().length]
    );
  }

  saveLevels() {
    let savedLevels = JSON.stringify(this.levelCells);
    localStorage.clear();
    localStorage.setItem('levels', savedLevels);
  }

  fetchLevels() {
    if (localStorage.getItem('levels')) {
      const levelsData: any[] = JSON.parse(
        window.localStorage.getItem('levels')!
      );

      this.levelCells.next(
        levelsData.map((data) => new Level(data.row, data.col, data.isOpened))
      );
    } else {
      this.createLevels();
      this.saveLevels();
    }
  }

  createLevels() {
    this.levelCells.next([
      new Level(2, 2, true),
      new Level(2, 3),
      new Level(3, 4),
      new Level(4, 4),
      new Level(4, 5),
      new Level(5, 6),
      new Level(6, 6),
      new Level(6, 7),
      new Level(6, 8),
    ]);
  }
}
