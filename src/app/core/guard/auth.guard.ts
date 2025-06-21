import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const AuthGuard: CanActivateFn = (state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasToken())
    return true;

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};