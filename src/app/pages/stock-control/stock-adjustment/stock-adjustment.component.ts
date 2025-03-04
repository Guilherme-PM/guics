import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../../../imports/imports';
import { PaginatorDTO } from '../../../models/paginator/paginator-dto';
import { StockAdjustmentService } from '../../../services/stock-control/stock-adjustment/stock-adjustment.service';
import { PaginatedResultDTO } from '../../../models/paginator/paginated-result-dto';
import { StockAdjustmentUpdateDTO } from '../../../models/stock-control/stock-adjustment/stock-adjustment-update-dto';
import { StockAdjustmentListDTO } from '../../../models/stock-control/stock-adjustment/stock-adjustment-list-dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stock-adjustment',
  imports: [ImportsModule],
  templateUrl: './stock-adjustment.component.html',
  styleUrl: './stock-adjustment.component.scss'
})
export class StockControlComponent implements OnInit {
  loading: boolean = false;
  stocks: StockAdjustmentListDTO[] = [];
  selectedStock: StockAdjustmentListDTO[] = [];
  clonedStock: { [s: string]: StockAdjustmentListDTO } = {};
  searchValue: string = '';

  constructor(private stockSvc: StockAdjustmentService, private messageService: MessageService){ }

  ngOnInit(): void {
    this.listStock();	
  }
  // TODO: Sugerir um estoque mínimo e máximo para cada produto ao cadastrar um novo estoque.
  
  // TODO: Para o cadastro de um estoque para um produto nunca antes vinculado ele irá aparecer em tabela com o status "Estoque não configurado"
  // (Isso será exibido caso o idStock seja NULL). (Aparecer um triângulo de warn juntamente com a linha amarela)

  listStock(){
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 10 };

    this.stockSvc.listStockByCompany(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.stocks = response.items as StockAdjustmentListDTO[];
      }
    });
  }

  onRowEditInit(stock: StockAdjustmentListDTO) {
    this.clonedStock[stock.idStock] = { ...stock };
  }

  onRowEditSave(stock: StockAdjustmentUpdateDTO) {
    if (stock.maxStock && stock.minStock && stock.idStock) {
      const originalStock = { ...this.clonedStock[stock.idStock] };
  
      delete this.clonedStock[stock.idStock];
  
      this.stockSvc.updateStock(stock.idStock, stock).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Estoque editada', life: 3000 });
          this.listStock();
        },
        error: (error) => {
          this.stocks = this.stocks.map((sto: StockAdjustmentListDTO) =>
            sto.idStock === stock.idStock ? { ...originalStock } : sto
          );
  
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao editar o estoque: ${error.error.Message}`, life: 3000 });
        }
      });
  
    } else {
      if(stock.maxStock && stock.minStock){
        this.stockSvc.registerStock(stock).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Estoque criado', life: 3000 });
            this.listStock();
          },
          error: (error) => {
            this.stocks = this.stocks.map((sto: StockAdjustmentListDTO) =>
              sto.idStock === stock.idStock ? { ...originalStock } : sto
            );
    
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao criar o estoque: ${error.error.Message}`, life: 3000 });
          }
        });
      }

      const originalStock = this.clonedStock[stock.idStock];
      
      if (originalStock) 
        stock.idStock = originalStock.idStock;
      
      this.stocks = this.stocks.map((cat: StockAdjustmentListDTO) =>
        cat.idStock === stock.idStock ? { ...originalStock } : cat
      );
      
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Altere pelo menos um valor', life: 3000 });
    }
  }
    
  onRowEditCancel(stock: StockAdjustmentListDTO, index: number) {
    this.stocks[index] = this.clonedStock[stock.idStock];
    delete this.clonedStock[stock.idStock];
  }

  clearFilters(event: any){

  }

  onPageChange(event: any){
    
  }

  deleteProduct(event: any){

  }

  getStockLevelSeverity(stockLevelDescription: string): 'secondary' | 'success' | 'info' | 'danger' | 'contrast' | 'warn' | undefined {
    switch (stockLevelDescription) {
      case 'Sem Estoque':
        return 'contrast';
      case 'Estoque Baixo':
        return 'danger';
      case 'Estoque Médio':
        return 'warn';
      case 'Estoque Alto':
        return 'success';
      default:
        return 'secondary';
    }
  }
}
