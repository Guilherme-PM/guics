import { Component } from '@angular/core';
import { PrivateSidebarComponent } from '../sidebar/sidebar.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'private-header',
  imports: [PrivateSidebarComponent, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class PrivateHeaderComponent {

}
