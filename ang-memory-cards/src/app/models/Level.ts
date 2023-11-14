export class Level {
    row: number;
    col: number;
    isOpened: boolean;

    constructor(row: number, col: number, isOpened = false) {
        this.row = row;
        this.col = col;
        this.isOpened = isOpened;
    }

    get cardsAmount(): number {
        return this.row * this.col;
    }
}
