import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { Ripple } from 'primeng/ripple';
import { StyleClass } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, ButtonModule, AvatarModule, Ripple, StyleClass, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;
  openMenus: boolean = true;
  user: any;
  visible: boolean = false;

  constructor(private authSvc: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
  
  closeDrawer() {
    this.visible = false;
  }

  logout(){
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
