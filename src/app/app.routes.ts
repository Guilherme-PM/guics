import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrivateLayoutComponent } from './layout/private-layout/private-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { AuthGuard } from './guard/auth.guard';
import { ProductComponent } from './pages/product/product.component';
import { SubcategoryComponent } from './pages/subcategory/subcategory.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'subcategory', component: SubcategoryComponent },
      { path: 'product', component: ProductComponent }
    ]
  }
];
