import { Routes } from "@angular/router";
import { LevelsComponent } from "./components/levels/levels.component";
import { GameComponent } from "./components/game/game.component";

const routeConfig: Routes = [
    {
        path: '',
        component: LevelsComponent
    },
    {
        path: "game/:id",
        component: GameComponent
    }
] ;

export default routeConfig;