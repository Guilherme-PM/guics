import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportsModule } from '../../imports/imports';
import { SubcategoryUpdateDTO } from '../../models/subcategory/subcategory-update-dto';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { CategoryService } from '../../services/category/category.service';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';
import { CategoryListDTO } from '../../models/category/category-list-dto';
import { SubcategoryService } from '../../services/subcategory/subcategory.service';
import { ResponseDTO } from '../../models/response-dto';
import { MessageService } from 'primeng/api';
import { SubcategoryListDTO } from '../../models/subcategory/subcategory-list-dto';

@Component({
  selector: 'app-subcategory',
  imports: [ImportsModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit{
  selectedSubcategories!: SubcategoryUpdateDTO[] | null;
  subcategoryForm!: FormGroup;
  subcategoryDialog: boolean = false;
  categories!: CategoryListDTO[];
  loading: boolean = false;
  searchValue: string | undefined;
  subcategories: SubcategoryListDTO[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private categorySvc: CategoryService, 
    private subcategorySvc: SubcategoryService,
    private messageService: MessageService){ }

  ngOnInit(): void {
    this.subcategoryForm = this.formBuilder.group({
      idCategory: [null, Validators.required],
      name: ['', [Validators.required]],
      description: ['']
    });
    
    this.listCategories();
    this.listSubcategories();
  }

  listSubcategories(){
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 10 };

    this.subcategorySvc.listSubcategory(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.subcategories = response.items as SubcategoryListDTO[];
      }
    });
  }

  listCategories(){
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 100 };

    this.categorySvc.listCategory(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.categories = response.items as CategoryListDTO[];
      }
    });
  }

  showDialogRegister(){
    this.subcategoryDialog = true;
  }

  saveSubcategory(){
    if (this.subcategoryForm.invalid) 
      return;
  
    this.subcategorySvc.registerSubcategory(this.subcategoryForm.value).subscribe({
      next: (response: ResponseDTO) => {    
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `${response.message}`, life: 3000 });
        this.subcategoryDialog = false;

        this.listSubcategories();
      }
    });
  }

  deleteSelectedSubcategories(){

  }

  clearFilters(table: any){

  }
}
