export class Level {
  cardsAmount: number;
  isOpened = false;

  constructor(cardsAmount: number) {
    this.cardsAmount = cardsAmount;
  }
}
