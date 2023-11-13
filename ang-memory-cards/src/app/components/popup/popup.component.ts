import {
    Component,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
    HostBinding,
} from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    standalone: true,
    selector: "popup",
    templateUrl: "./popup.component.html",
    styleUrls: ["./popup.component.css"],
    imports: [RouterModule],
})
export class PopupComponent {
    @ViewChild("myModal", { static: false }) popup!: ElementRef;
    @Output() navNextLevel = new EventEmitter();
    @HostBinding("class.hidden") hidden: boolean = true;

    open() {
        this.hidden = false;
    }

    levelsMenu() {
        this.hidden = true;
    }

    nextLevel() {
        this.hidden = true;
        this.navNextLevel.emit();
    }
}
