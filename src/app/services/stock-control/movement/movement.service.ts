import { inject, Injectable } from '@angular/core';
import { PaginatorDTO } from '../../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../../models/paginator/paginated-result-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ResponseDTO } from '../../../models/response-dto';
import { MovementRegisterDTO } from '../../../models/stock-control/movement/movement-register-dto';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private readonly http = inject(HttpClient);

  listStockByCompany(paginatorDTO: PaginatorDTO): Observable<PaginatedResultDTO> {
    const params = new HttpParams({ fromObject: { 
      pageNumber: paginatorDTO.pageNumber.toString(), 
      pageSize: paginatorDTO.pageSize.toString() 
    }});

    return this.http.get<PaginatedResultDTO>(`${environment.apiUrl}StockMovement/GetAllStockMovementsByCompany/`, { params });
  }

  registerMovementByCompany(movementDTO: MovementRegisterDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(environment.apiUrl + `StockMovement/MoveStock/`, movementDTO);
  }
}
