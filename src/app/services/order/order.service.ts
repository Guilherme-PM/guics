import { inject, Injectable } from '@angular/core';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly http = inject(HttpClient);

  listProducts(paginatorDTO: PaginatorDTO): Observable<PaginatedResultDTO> {
    const params = new HttpParams()
      .set('pageNumber', paginatorDTO.pageNumber.toString())
      .set('pageSize', paginatorDTO.pageSize.toString())
  
    return this.http.get<PaginatedResultDTO>(`${environment.apiUrl}Order/GetOrders/`, { params });
  }
}
