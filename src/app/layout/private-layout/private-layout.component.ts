import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportsModule } from '../../imports/imports';
import { ConfirmationService } from 'primeng/api';
import { PrivateSidebarComponent } from '../sidebar/sidebar.component';
import { PrivateHeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, ImportsModule, PrivateHeaderComponent, PrivateSidebarComponent],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss',
  providers: [ConfirmationService]
})
export class PrivateLayoutComponent {
}
