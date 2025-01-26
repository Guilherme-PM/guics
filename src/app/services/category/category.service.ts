import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryRegisterDTO } from '../../models/category/category-register-dto';
import { CategoryListDTO } from '../../models/category/category-list-dto';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  registerCategory(category: CategoryRegisterDTO): Observable<CategoryListDTO> {
    console.log('Chamando registerCategory com dados:', category); // Log de depuração
  
    return this.http.post<CategoryListDTO>(
      environment.apiUrl + 'Category/RegisterCategoryByCompany',
      category
    );
  }

  listCategory(request: PaginatorDTO, idCompany: number): Observable<PaginatedResultDTO> {
    const params = new HttpParams()
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('idCompany', idCompany.toString());
  
    return this.http.get<PaginatedResultDTO>(
      `${environment.apiUrl}Category/GetAllCategorysByCompany`,
      { params }
    );
  }
}
