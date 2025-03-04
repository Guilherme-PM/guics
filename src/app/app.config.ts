import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../styles/mytheme';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { errorInterceptor } from './interceptors/error/error.interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(ROUTES), 
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])), 
    provideAnimations(),
    providePrimeNG({ 
      theme: {
        preset: MyPreset,
      }
    }),
    MessageService
  ]
};
