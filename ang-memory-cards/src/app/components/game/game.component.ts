import { Component, ViewChild, inject } from "@angular/core";
import { Card } from "../../model/Card";
import { CardCellComponent } from "../card-cell/card-cell.component";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PopupComponent } from "../popup/popup.component";

@Component({
    standalone: true,
    selector: "game",
    templateUrl: "./game.component.html",
    styleUrls: ["./game.component.css"],
    imports: [CommonModule, CardCellComponent, PopupComponent, RouterModule],
})
export class GameComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    cardsAmount: number = 0;
    columsCount: number = 3;
    cardCells: Card[] = [];
    firstFlippedIndex = -1;
    secondFlippedIndex = -1;

    @ViewChild("popup", { static: false }) popup!: PopupComponent;

    constructor() {
        this.cardsAmount = Number(this.route.snapshot.params["id"]);
        this.generateCards(this.cardsAmount);
    }

    nextLevel() {
        this.generateCards((this.cardsAmount += 2));
    }

    getRandomAssets(assetsArray: string[], cardsAmount: number) {
        const shuffled = [...assetsArray]
            .sort(() => 0.5 - Math.random())
            .slice(0, cardsAmount);
        const merged = shuffled
            .concat(shuffled.reverse())
            .sort(() => 0.5 - Math.random());
        return merged;
    }

    generateCards(level: number) {
        this.checkColumns();
        const cardsAmount = level / 2;
        const assetsArray = [
            "chameleon",
            "chick",
            "crab",
            "elephant",
            "frog",
            "jellyfish",
            "penguin",
            "sea-turtle",
            "butterfly",
            "rabbit",
            "crocodile",
            "owl",
            "squirrel",
            "snail",
            "squirrel",
            "pig",
        ];

        const randomAssets = this.getRandomAssets(assetsArray, cardsAmount);
        this.cardCells = randomAssets.map((asset) => new Card(asset));
    }

    onCardClick(index: number) {
        if (this.firstFlippedIndex === -1) {
            this.firstFlippedIndex = index;
            this.cardCells[index].isEnabled = false;
            return;
        }
        this.secondFlippedIndex = index;

        for (const card of this.cardCells) {
            card.isEnabled = false;
        }
        setTimeout(this.checkMatch, 900);
    }

    checkMatch = () => {
        const firstFlippedCard = this.cardCells[this.firstFlippedIndex];
        const secondFlippedCard = this.cardCells[this.secondFlippedIndex];

        if (firstFlippedCard.imgName === secondFlippedCard.imgName) {
            console.log("Match!");
            this.firstFlippedIndex = -1;
            this.checkGameOver();
        } else {
            console.log("No Match!");
            firstFlippedCard.isFlipped = false;
            secondFlippedCard.isFlipped = false;
            this.firstFlippedIndex = -1;
        }

        for (const card of this.cardCells) {
            card.isEnabled = !card.isFlipped;
        }
    };

    checkGameOver() {
        const unflippedCards = this.cardCells.filter((card) => !card.isFlipped);
        if (unflippedCards.length > 0) {
            return;
        } else {
            console.log("Victory! Congrats =)");
            this.popup.open();
        }
    }

    checkColumns() {
        switch (this.cardsAmount) {
            case 4:
                this.columsCount = 2;
                break;
            case 6:
                this.columsCount = 3;
                break;
            case 8:
                this.columsCount = 4;
                break;
            case 10:
                this.columsCount = 5;
                break;
            case 12:
                this.columsCount = 4;
                break;
            case 14:
                this.columsCount = 2;
                break;
            case 16:
                this.columsCount = 4;
                break;
            case 18:
                this.columsCount = 6;
                break;
            default:
                break;
        }
    }
}
