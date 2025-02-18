import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRegisterDTO } from '../../models/product/product-register-dto';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../models/response-dto';
import { environment } from '../../../environments/environment';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  registerProduct(productDTO: ProductRegisterDTO): Observable<ResponseDTO> {  
    return this.http.post<ResponseDTO>(`${environment.apiUrl}Product/RegisterProduct`, productDTO);
  }

  listProducts(paginatorDTO: PaginatorDTO): Observable<PaginatedResultDTO> {
    const params = new HttpParams()
      .set('pageNumber', paginatorDTO.pageNumber.toString())
      .set('pageSize', paginatorDTO.pageSize.toString())
  
    return this.http.get<PaginatedResultDTO>(`${environment.apiUrl}Product/GetAllProducts/`, { params });
  }
}
