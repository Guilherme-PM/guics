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

  listCategory(paginatorDTO: PaginatorDTO): Observable<PaginatedResultDTO> {
    const params = new HttpParams()
      .set('pageNumber', paginatorDTO.pageNumber.toString())
      .set('pageSize', paginatorDTO.pageSize.toString())
  
    return this.http.get<PaginatedResultDTO>(`${environment.apiUrl}Category/GetAllCategoriesByCompany/`, { params });
  }

  registerCategory(categoryDTO: CategoryRegisterDTO): Observable<ResponseDTO> {  
    return this.http.post<ResponseDTO>(environment.apiUrl + `Category/RegisterCategoryByCompany`, categoryDTO);
  }

  updateCategory(idCategory: number, categoryDTO: CategoryUpdateDTO): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(environment.apiUrl + `Category/UpdateCategoryByCompany/${idCategory}`, categoryDTO);
  }

  deleteCategoriesAsync(idsCategories: number[]): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(environment.apiUrl + 'Category/DeleteCategoriesByCompany', idsCategories);
  }

  deleteCategoryAsync(idCategory: number): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(environment.apiUrl + `Category/DeleteCategoryByCompany/${idCategory}`);
  }
}
