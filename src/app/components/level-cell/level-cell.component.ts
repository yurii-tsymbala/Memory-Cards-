import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Level } from 'src/app/models/Level';

@Component({
  standalone: true,
  selector: 'level-cell',
  templateUrl: './level-cell.component.html',
  styleUrls: ['./level-cell.component.css'],
  imports: [CommonModule, RouterLink],
})
export class LevelCellComponent {
  @Input() level!: Level;

  launchGame() {}
}
