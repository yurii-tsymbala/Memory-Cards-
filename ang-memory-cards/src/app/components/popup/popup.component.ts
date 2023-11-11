import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'popup',
  templateUrl: './popup.component.html',
  imports: [RouterModule]
})
export class PopupComponent {
  @ViewChild('myModal', { static: false }) popup!: ElementRef;
  @Output() navNextLevel = new EventEmitter();

  open() {
    this.popup.nativeElement.style.display = 'block';
  }

  levelsMenu() {
    this.popup.nativeElement.style.display = 'none';
  }

  nextLevel() {
    this.popup.nativeElement.style.display = 'none';
    this.navNextLevel.emit();
  }
}
