import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, ButtonModule, Toast],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  // providers: [MessageService]
})
export class DashboardComponent {
  constructor(private messageService: MessageService) {}

  show() {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  }
}
