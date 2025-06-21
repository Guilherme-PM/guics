import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { OrderService } from '../../services/order/order.service';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';

@Component({
  selector: 'app-open-order-list',
  imports: [DialogModule, ButtonModule, DividerModule, CardModule, CommonModule, FloatLabelModule, InputTextModule, PanelModule],
  templateUrl: './open-order-list.component.html',
  styleUrl: './open-order-list.component.scss'
})
export class OpenOrderListComponent {
  orders: any[] = [];
  filteredOrders: any[] = [];
  searchValue: string = '';
  availableOrders: number = 0;
  occupiedOrders: number = 0;
  totalCards: number = 30; // Número total de cards a serem exibidos

  private readonly orderSvc = inject(OrderService);
  private timer: any;

  ngOnInit(): void {
    this.loadOrders();

    this.timer = setInterval(() => {
      this.orders.forEach(order => {
        order['elapsedTime'] = this.getTimeElapsed(order.createdAt); // Atualiza o tempo decorrido
      });
    }, 1000);
  }

  loadOrders() {
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 100 };

    this.orderSvc.listProducts(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.orders = response.items as any;
      }
    });

    this.updateOrderCounts();
  }

  getCardClass(order: any): string {
    if (order.status == 'available') {
      return 'available'; 
    } else if (order.status == 'occupied') {
      return 'occupied'; 
    } else {
      return 'default';
    }
  }

  getTimeElapsed(createdAt: Date | string | undefined): string {
    if (!createdAt) return 'N/A';

    const now = new Date();
    const start = new Date(createdAt); // Converte para Date se for string
    const diffMs = now.getTime() - start.getTime(); // Diferença em milissegundos

    const hours = Math.floor(diffMs / (1000 * 60 * 60)); // Calcula horas
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutos restantes
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000); // Segundos restantes

    if (hours > 0) {
      return `${hours}h ${minutes}min ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}min ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  filterOrders() {
    this.filteredOrders = this.orders.filter(order => order.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  updateOrderCounts() {
    this.availableOrders = this.orders.filter(order => order.status === 'available').length;
    this.occupiedOrders = this.orders.filter(order => order.status === 'occupied').length;
  }

  action1() {
    // Implement action 1
  }

  action2() {
    // Implement action 2
  }

  action3() {
    // Implement action 3
  }
}
