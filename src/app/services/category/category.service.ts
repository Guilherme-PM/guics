import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryRegisterDTO } from '../../models/category/category-register-dto';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';
import { CategoryUpdateDTO } from '../../models/category/category-update-dto';
import { ResponseDTO } from '../../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  registerCategory(category: CategoryRegisterDTO): Observable<ResponseDTO> {  
    return this.http.post<ResponseDTO>(
      environment.apiUrl + 'Category/RegisterCategoryByCompany',
      category
    );
  }

  updateCategory(category: CategoryUpdateDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      environment.apiUrl + 'Category/UpdateCategoryByCompany',
      category
    );
  }

  deleteCategoriesAsync(category: CategoryUpdateDTO[]): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      environment.apiUrl + 'Category/DeleteCategoriesByCompany',
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
