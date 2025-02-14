import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRegisterDTO } from '../../models/product/product-register-dto';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../models/response-dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

    registerProduct(productDTO: ProductRegisterDTO): Observable<ResponseDTO> {  
      return this.http.post<ResponseDTO>(`${environment.apiUrl}Product/RegisterProductAsync`, productDTO);
    }
}
