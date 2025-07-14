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
import { Barcode, ChevronDown, ChevronUp, Copy, Ellipsis, Folder, FolderOpen, Home, LucideAngularModule, Package, PanelLeft, Plus, Search, Tags, TrendingUp, TriangleAlert, Upload, User, Warehouse, X } from 'lucide-angular';

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
    importProvidersFrom(LucideAngularModule.pick({ Home, User, Tags, Folder, FolderOpen, Search, Ellipsis, PanelLeft, X, Plus, ChevronUp, ChevronDown,
      Upload, Warehouse, Package, TrendingUp, TriangleAlert, Copy, Barcode
     })),
    MessageService,
    ConfirmationService
  ]
};
