export class Level {
  constructor(
    public row: number,
    public col: number,
    public isOpened = false
  ) {}

  get cardsAmount(): number {
    return this.row * this.col;
  }
}
