export class Level {
    row: number;
    col: number;
    isOpened = false;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    get cardsAmount(): number {
        return this.row * this.col;
    }
}
