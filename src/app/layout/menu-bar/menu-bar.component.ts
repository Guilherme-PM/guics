import { Component } from '@angular/core';
import { ImportsModule } from '../../imports/imports';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-menu-bar',
  imports: [ImportsModule, SidebarComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

}
