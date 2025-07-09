import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { GuicsTheme } from '../theme/GuicsTheme';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChevronDown, ChevronUp, Ellipsis, Folder, FolderOpen, Home, LucideAngularModule, Plus, Search, Table2, Tags, User, X } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: GuicsTheme,
      }
    }),
    importProvidersFrom(LucideAngularModule.pick({ Home, User, Tags, Folder, FolderOpen, Search, Ellipsis, Table2, X, Plus, ChevronUp, ChevronDown })),
    MessageService,
    ConfirmationService
  ]
};
