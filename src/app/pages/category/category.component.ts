import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../../imports/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryRegisterDTO } from '../../models/category/category-register-dto';
import { UserDTO } from '../../models/user-dto';
import { CategoryService } from '../../services/category/category.service';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';
import { CategoryListDTO } from '../../models/category/category-list-dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { isNotNullOrEmpty } from '../../helper/validation-helper';
import { CategoryUpdateDTO } from '../../models/category/category-update-dto';
import { ResponseDTO } from '../../models/response-dto';

@Component({
  selector: 'app-category',
  imports: [ImportsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories: CategoryListDTO[] = [];
  loading: boolean = false;
  categoryForm!: FormGroup;
  clonedCategories: { [s: string]: CategoryListDTO } = {};
  categoryDialog: boolean = false;
  searchValue: string | undefined;
  selectedCategories!: CategoryUpdateDTO[] | null;

  constructor(
    private formBuilder: FormBuilder, 
    private categorySvc: CategoryService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService){ }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });
    
    this.listCategories();
  }
  
  listCategories(){
    this.loading = true;
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 10 };

    this.categorySvc.listCategory(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.categories = response.items as CategoryListDTO[];
        this.loading = false;
      }
    });
  }

  showDialogRegister(){
    this.categoryDialog = true;
    this.categoryForm.reset();
  }

  saveCategory(){
    if (this.categoryForm.invalid) 
      return;
  
    this.categorySvc.registerCategory(this.categoryForm.value).subscribe({
      next: (response: ResponseDTO) => {
        if(!response.success){
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `${response.message}`, life: 5000 });
          return;
        }
        
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `${response.message}`, life: 3000 });
        this.categoryDialog = false;
        this.listCategories();
      }
    });
  }

  clearFilters(table: any){
    table.clear();
    this.searchValue = ''
  }

  onRowEditInit(category: CategoryListDTO) {
    this.clonedCategories[category.idCategory] = { ...category };
  }

  onRowEditSave(category: CategoryUpdateDTO) {
    if (isNotNullOrEmpty(category.name)) {
      const originalCategory = { ...this.clonedCategories[category.idCategory] };
  
      delete this.clonedCategories[category.idCategory];
  
      this.categorySvc.updateCategory(category.idCategory, category).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria editada', life: 3000 });
          this.listCategories();
        },
        error: (error) => {
          this.categories = this.categories.map((cat: CategoryListDTO) =>
            cat.idCategory === category.idCategory ? { ...originalCategory } : cat
          );
  
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao editar a categoria: ${error.error.Message}`, life: 3000 });
        }
      });
  
    } else {
      const originalCategory = this.clonedCategories[category.idCategory];
      
      if (originalCategory) 
        category.name = originalCategory.name;
      
      this.categories = this.categories.map((cat: CategoryListDTO) =>
        cat.idCategory === category.idCategory ? { ...originalCategory } : cat
      );
      
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Nome inválido', life: 3000 });
    }
  }
  
  
  onRowEditCancel(category: CategoryListDTO, index: number) {
    this.categories[index] = this.clonedCategories[category.idCategory];
    delete this.clonedCategories[category.idCategory];
  }

  deleteSelectedCategories() {
    let idsCategories = this.selectedCategories?.map(x => x.idCategory);

    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir as categorias selecionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorySvc.deleteCategoriesAsync(idsCategories!).subscribe({
          next: (response: ResponseDTO) => {
            if(!response.success){
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro: ${response.message}`, life: 3000 });
              return;
            }

            this.categories = this.categories.filter((val: any) => !idsCategories?.includes(val));
            this.selectedCategories = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `${response.message}`,
              life: 3000
            });

            this.listCategories();
          }
        });
      }
    });
  }

  deleteProduct(category: CategoryUpdateDTO) {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja deletar a categoria: <strong>${category.name}</strong> ?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorySvc.deleteCategoryAsync(category.idCategory).subscribe({
          next: (response: ResponseDTO) => {
            if(!response.success){
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro: ${response.message}`, life: 3000 });
              return;
            }

            this.categories = this.categories.filter((val: any) => val.id !== category.idCategory);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto deletado',
              life: 3000
            });

            this.listCategories();
          }
        });
      }
    });
  }
}
