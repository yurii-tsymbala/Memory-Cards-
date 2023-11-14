import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { AppComponent } from './app/app.components';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LevelService } from './app/services/level.service';

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routeConfig),
      provideAnimations(),
      LevelService
    ]
  })
  .catch((err) => console.error(err)); 
