import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GameComponent } from './game.component';
import { CardCellComponent } from './components/card-cell/card-cell.component';

@NgModule({
  declarations: [
    GameComponent,
    CardCellComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [GameComponent]
})
export class AppModule { }
