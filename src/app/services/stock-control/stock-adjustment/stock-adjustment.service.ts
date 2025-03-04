import { inject, Injectable } from '@angular/core';
import { PaginatorDTO } from '../../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../../models/paginator/paginated-result-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { StockAdjustmentUpdateDTO } from '../../../models/stock-control/stock-adjustment/stock-adjustment-update-dto';
import { ResponseDTO } from '../../../models/response-dto';
import { StockAdjustmentRegisterDTO } from '../../../models/stock-control/stock-adjustment/stock-adjustment-register-dto';

@Injectable({
  providedIn: 'root'
})
export class StockAdjustmentService {
  private readonly http = inject(HttpClient);

  listStockByCompany(paginatorDTO: PaginatorDTO): Observable<PaginatedResultDTO> {
    const params = new HttpParams({ fromObject: { 
      pageNumber: paginatorDTO.pageNumber.toString(), 
      pageSize: paginatorDTO.pageSize.toString() 
    }});
  
    return this.http.get<PaginatedResultDTO>(`${environment.apiUrl}Stock/GetAllStockByCompany/`, { params });
  }

  updateStock(idStock: number, stockDTO: StockAdjustmentUpdateDTO): Observable<ResponseDTO> {
    return this.http.patch<ResponseDTO>(environment.apiUrl + `Stock/UpdateStockByCompany/${idStock}`, stockDTO);
  }

  registerStock(stockDTO: StockAdjustmentRegisterDTO): Observable<ResponseDTO> {  
    return this.http.post<ResponseDTO>(`${environment.apiUrl}Stock/RegisterStockByCompany`, stockDTO);
  }
}
