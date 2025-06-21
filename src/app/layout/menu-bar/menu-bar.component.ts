import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PmDrawerComponent } from '../pm-drawer/pm-drawer.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PrivateHeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-menu-bar',
  imports: [PmDrawerComponent, SidebarComponent, ToolbarModule, AvatarModule, InputTextModule, ButtonModule, ThemeSwitcherComponent, PrivateHeaderComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

}
