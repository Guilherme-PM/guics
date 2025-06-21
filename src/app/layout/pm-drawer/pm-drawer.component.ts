import { Component, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'pm-drawer',
  imports: [ AvatarModule, DrawerModule, ButtonModule ],
  templateUrl: './pm-drawer.component.html',
  styleUrl: './pm-drawer.component.scss'
})
export class PmDrawerComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
      this.drawerRef.close(e);
  }

  visible: boolean = false;
}
