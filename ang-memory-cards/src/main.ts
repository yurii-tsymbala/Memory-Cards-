import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { AppComponent } from './app/app.components';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routeConfig),
      provideAnimations()
    ]
  })
  .catch((err) => console.error(err)); 
