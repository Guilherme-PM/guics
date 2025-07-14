import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'private-sidebar',
  imports: [ButtonModule, AvatarModule, RouterModule, CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class PrivateSidebarComponent {
  openMenus: boolean = true;
  user: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  closeSidebar(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  logout(){
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
