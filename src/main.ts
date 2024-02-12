import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { AppComponent } from './app/components/app/app.components';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LevelService } from './app/services/level.service';
import { CardService } from './app/services/card.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideAnimations(),
    LevelService,
    CardService,
  ],
}).catch((err) => console.error(err));
