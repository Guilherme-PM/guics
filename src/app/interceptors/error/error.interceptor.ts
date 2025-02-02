import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 500) { 
        messageService.add({
          severity: 'error',
          summary: 'Erro Interno',
          detail: `Ocorreu um erro interno no sistema. Erro: ${error.message}`,
          life: 5000
        });
      } else if (error.status === 0) {
        messageService.add({
          severity: 'error',
          summary: 'Servidor Indisponível',
          detail: 'Não foi possível conectar ao servidor.',
          life: 5000
        });
      }

      return throwError(() => error);
    })
  );
};
