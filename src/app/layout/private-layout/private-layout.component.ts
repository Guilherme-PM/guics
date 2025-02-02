import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { ImportsModule } from '../../imports/imports';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, MenuBarComponent, ImportsModule],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss',
  providers: [ConfirmationService]
})
export class PrivateLayoutComponent {
}
