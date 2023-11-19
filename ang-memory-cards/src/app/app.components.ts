import { Component } from '@angular/core';
import { LevelsComponent } from './components/levels/levels.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [LevelsComponent, RouterModule],
})
export class AppComponent {}
