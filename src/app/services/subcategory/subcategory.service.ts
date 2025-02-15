import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponseDTO } from '../../models/response-dto';
import { Observable } from 'rxjs';
import { SubcategoryRegisterDTO } from '../../models/subcategory/subcategory-register-dto';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }

  listSubcategory(paginatorDTO: PaginatorDTO): Observable<PaginatedResultDTO> {
    const params = new HttpParams()
      .set('pageNumber', paginatorDTO.pageNumber.toString())
      .set('pageSize', paginatorDTO.pageSize.toString())
  
    return this.http.get<PaginatedResultDTO>(`${environment.apiUrl}Subcategory/GetAllSubcategoriesByCompany/`, { params });
  }

  getAllCategoriesWithSubcategoriesAsync(): Observable<ResponseDTO> {  
    return this.http.get<ResponseDTO>(`${environment.apiUrl}Subcategory/GetAllCategoriesWithSubcategories`);
  }

  registerSubcategory(subcategoryDTO: SubcategoryRegisterDTO): Observable<ResponseDTO> {  
    return this.http.post<ResponseDTO>(`${environment.apiUrl}Subcategory/RegisterSubcategoryByCompany`, subcategoryDTO);
  }
}
