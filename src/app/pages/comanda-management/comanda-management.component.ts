// src/app/comanda-management.component.ts
import {
  Component,
  computed,
  signal,
  effect,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';

type ComandaStatus = 'Aberta' | 'Disponível' | 'Reservada';

interface ComandaItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Comanda {
  id: number;
  nickname: string;
  tableNumber: string;
  amount: number;
  status: ComandaStatus;
  items: ComandaItem[];
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-comanda-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    CardModule,
    TableModule,
    DropdownModule,
    TabViewModule,
  ],
  templateUrl: './comanda-management.component.html',
})
export class ComandaManagementComponent {
  comandas = signal<Comanda[]>([
    { id: 1, nickname: 'João', tableNumber: '01', amount: 75.5, status: 'Aberta', items: [
      { id: 1, name: 'Cerveja', quantity: 2, price: 12.0 },
      { id: 2, name: 'Porção de Batatas', quantity: 1, price: 25.0 },
      { id: 3, name: 'Água', quantity: 1, price: 5.0 },
      { id: 4, name: 'Hambúrguer', quantity: 1, price: 21.5 },
    ] },
    { id: 2, nickname: 'Maria', tableNumber: '02', amount: 120.75, status: 'Aberta', items: [
      { id: 1, name: 'Pizza Grande', quantity: 1, price: 65.0 },
      { id: 2, name: 'Refrigerante 2L', quantity: 1, price: 12.0 },
      { id: 3, name: 'Sobremesa', quantity: 2, price: 21.9 },
    ] },
    { id: 3, nickname: 'Carlos', tableNumber: '03', amount: 45.0, status: 'Aberta', items: [] },
    { id: 4, nickname: '', tableNumber: '04', amount: 0, status: 'Disponível', items: [] },
    { id: 5, nickname: '', tableNumber: '05', amount: 0, status: 'Disponível', items: [] },
    { id: 6, nickname: 'Lucia', tableNumber: '06', amount: 0, status: 'Reservada', items: [] },
    { id: 7, nickname: 'Roberto', tableNumber: '07', amount: 95.25, status: 'Aberta', items: [] },
    { id: 8, nickname: '', tableNumber: '08', amount: 0, status: 'Disponível', items: [] },
    { id: 9, nickname: 'Gustavo', tableNumber: '09', amount: 150.0, status: 'Aberta', items: [] },
    { id: 10, nickname: '', tableNumber: '10', amount: 0, status: 'Disponível', items: [] },
  ]);

  menuItems: MenuItem[] = [
    { id: 1, name: 'Cerveja', price: 12.0, category: 'Bebidas' },
    { id: 2, name: 'Refrigerante', price: 8.0, category: 'Bebidas' },
    { id: 3, name: 'Água', price: 5.0, category: 'Bebidas' },
    { id: 4, name: 'Suco Natural', price: 10.0, category: 'Bebidas' },
    { id: 5, name: 'Porção de Batatas', price: 25.0, category: 'Porções' },
    { id: 6, name: 'Porção de Calabresa', price: 28.0, category: 'Porções' },
    { id: 7, name: 'Isca de Frango', price: 30.0, category: 'Porções' },
    { id: 8, name: 'Hambúrguer', price: 22.0, category: 'Lanches' },
    { id: 9, name: 'X-Tudo', price: 28.0, category: 'Lanches' },
    { id: 10, name: 'Pizza Grande', price: 65.0, category: 'Pizzas' },
    { id: 11, name: 'Pizza Média', price: 45.0, category: 'Pizzas' },
    { id: 12, name: 'Sobremesa', price: 12.0, category: 'Sobremesas' },
  ];

  // Reactive states
  selectedComanda = signal<Comanda | null>(null);
  newNickname = signal('');
  selectedMenuItem = signal<MenuItem | null>(null);
  newItemQuantity = signal(1);
  searchTerm = signal('');

  // Dialog states
  showComandaDialog = signal(false);
  showNewComandaDialog = signal(false);
  showReserveDialog = signal(false);
  showTransferDialog = signal(false);
  showReportDialog = signal(false);

  getStatusColor(status: ComandaStatus): string {
    switch (status) {
      case 'Aberta':
        return 'bg-green-500';
      case 'Disponível':
        return 'bg-slate-500';
      case 'Reservada':
        return 'bg-amber-500';
      default:
        return 'bg-slate-500';
    }
  }

  getAvailableTables(): string[] {
    return this.comandas().filter(c => c.status === 'Disponível').map(c => c.tableNumber);
  }

  getOpenTables(): string[] {
    return this.comandas().filter(c => c.status === 'Aberta').map(c => c.tableNumber);
  }

  // (continua com os métodos de abrir, fechar, transferir, adicionar item, etc...)
}
