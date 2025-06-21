import { Routes } from "@angular/router";

export const STOCK_CONTROL_ROUTES: Routes = [
  {
    path: 'stock-adjustment',
    loadComponent: () => import('./stock-adjustment/stock-adjustment.component').then(c => c.StockControlComponent)
  },
  {
    path: 'movement',
    loadComponent: () => import('./movement/movement.component').then(c => c.MovementComponent)
  },
  {
    path: 'teste',
    loadComponent: () => import('../comanda-management/comanda-management.component').then(c => c.ComandaManagementComponent)
  }
]