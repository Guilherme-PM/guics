import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';
import { AuthGuard } from './core/guard/auth.guard';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadComponent: () => import('./layout/private-layout/private-layout.component').then(c => c.PrivateLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'subcategory', component: SubcategoryComponent },
      { path: 'product', component: ProductComponent },
      { path: 'stock-control', loadChildren: () => import('./pages/stock-control/stock-control.routes').then(a => a.STOCK_CONTROL_ROUTES) },
      {
        path: 'open-order',
        children: [
          { path: 'list', loadComponent: () => import('./pages/open-order-list/open-order-list.component').then(c => c.OpenOrderListComponent) }
        ]
      }
    ]
  }
];
