import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault();
    this.closeSidebar();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 'e') {
      event.preventDefault();
      this.visible = !this.visible;
      this.visibleChange.emit(this.visible);
    }
  }

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
