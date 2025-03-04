import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MovementListDTO } from '../../../models/stock-control/movement/movement-list-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorDTO } from '../../../models/paginator/paginator-dto';
import { MovementService } from '../../../services/stock-control/movement/movement.service';
import { MessageService } from 'primeng/api';
import { PaginatedResultDTO } from '../../../models/paginator/paginated-result-dto';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProductService } from '../../../services/product/product.service';
import { ProductListDropdownDTO } from '../../../models/product/product-list-dropdown-dto';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-movement',
  imports: [ToolbarModule, FileUploadModule, ButtonModule, TableModule, IconFieldModule,
    InputIconModule, FormsModule, CommonModule, InputTextModule, TagModule, DropdownModule,
    DialogModule, FloatLabelModule, SelectModule
  ],
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.scss'
})
export class MovementComponent implements OnInit {
  loading: boolean = false;
  movements: MovementListDTO[] = [];
  selectedMovement: MovementListDTO[] = [];
  products: ProductListDropdownDTO[] = [];
  searchValue: string = '';
  displayDialog: boolean = false;
  newMovement: any = {};

  typeOptions: any[] = [
    { label: 'Entrada', value: 1 },
    { label: 'Saída', value: 2 },
    { label: 'Ajuste', value: 3 }
  ];

  reasonOptions: any[] = [
    { label: 'Compra', value: 1 },
    { label: 'Devolução de fornecedor', value: 2 },
    { label: 'Transferência interna', value: 3 },
    { label: 'Ajuste positivo', value: 4 },
    { label: 'Venda', value: 5 },
    { label: 'Devolução de cliente', value: 6 },
    { label: 'Transferência externa', value: 7 },
    { label: 'Ajuste negativo', value: 8 },
    { label: 'Ajuste de inventário', value: 9 },
    { label: 'Perda', value: 10 },
    { label: 'Quebra', value: 11 },
    { label: 'Promoção', value: 12 },
    { label: 'Consignação', value: 13 }
  ];

  private movementSvc = inject(MovementService);
  private messageService = inject(MessageService);
  private productSvc = inject(ProductService);

  ngOnInit(): void {
    this.listMovement();
  }

  listMovement() {
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 10 };

    this.movementSvc.listStockByCompany(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.movements = response.items as MovementListDTO[];
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao listar movimentações: ${error.error.Message}`, life: 3000 });
      }
    });
  }

  onPageChange(event: any) {
    const paginator: PaginatorDTO = { pageNumber: event.page + 1, pageSize: event.rows };
    this.movementSvc.listStockByCompany(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.movements = response.items as MovementListDTO[];
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao mudar de página: ${error.error.Message}`, life: 3000 });
      }
    });
  }

  clearFilters(event: any) {
    this.searchValue = '';
    this.listMovement();
  }

  showDialogRegister() {
    this.listProducts();

    this.newMovement = {};
    this.displayDialog = true;
  }

  listProducts() {
    this.productSvc.listDropdownProducts().subscribe({
      next: (response: any) => {
        this.products = response;
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao listar produtos: ${error.error.Message}`, life: 3000 });
      }
    });
  }

  saveMovement() {
    this.movementSvc.registerMovementByCompany(this.newMovement).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Movimentação criado', life: 3000 });
        this.displayDialog = false;
        this.listMovement();
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao criar movimentação: ${error.error.Message}`, life: 3000 });
      }
    });
  }

  getTypeSeverity(typeDescription: string): 'secondary' | 'success' | 'info' | 'danger' | 'contrast' | 'warn' | undefined {
    switch (typeDescription) {
      case 'Entrada':
        return 'success';
      case 'Saída':
        return 'danger';
      case 'Ajuste':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getReasonSeverity(reasonDescription: string): 'secondary' | 'success' | 'info' | 'danger' | 'contrast' | 'warn' | undefined {
    switch (reasonDescription) {
      case 'Compra':
      case 'Devolução de cliente':
      case 'Consignação':
      case 'Venda':
        return 'success';
      case 'Devolução de fornecedor':
      case 'Perda':
      case 'Quebra':
        return 'danger';
      case 'Transferência interna':
      case 'Transferência externa':
      case 'Promoção':
        return 'info';
      case 'Ajuste positivo':
      case 'Ajuste negativo':
      case 'Ajuste de inventário':
        return 'warn';
      default:
        return 'secondary';
    }
  }
}
