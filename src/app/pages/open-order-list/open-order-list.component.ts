import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-open-order-list',
  imports: [DialogModule, ButtonModule, DividerModule, CardModule, CommonModule, FloatLabelModule, InputTextModule],
  templateUrl: './open-order-list.component.html',
  styleUrl: './open-order-list.component.scss'
})
export class OpenOrderListComponent {
  orders: any[] = [{name: 'Teste 1', value: 50, time: '1'}, {name: 'Teste 2', value: 50, time: '1'}, {name: 'Teste 3', value: 50, time: '1'}, {name: 'Teste 4', value: 50, time: '1'}];
  filteredOrders: any[] = [];
  searchValue: string = '';
  availableOrders: number = 0;
  occupiedOrders: number = 0;
  totalCards: number = 30; // Número total de cards a serem exibidos

  constructor() { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    // Dados de exemplo
    const exampleOrders = [
      { name: 'Guilherme', value: 100, openTime: '10 min', status: 'available' },
      { name: 'Comanda 2', value: 200, openTime: '20 min', status: 'occupied' },
      { name: 'Comanda 3', value: 150, openTime: '15 min', status: 'available' },
      { name: 'Comanda 4', value: 250, openTime: '25 min', status: 'occupied' },
      { name: 'Comanda 5', value: 300, openTime: '30 min', status: 'available' },
      { name: 'Comanda 6', value: 350, openTime: '35 min', status: 'occupied' }
    ];

    // Preencher com cards vazios até o número total desejado
    this.orders = [...exampleOrders];
    while (this.orders.length < this.totalCards) {
      this.orders.push({});
    }

    this.updateOrderCounts();
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
