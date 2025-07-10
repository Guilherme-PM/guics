import { SwitchComponent } from './../../core/components/switch/switch.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';
import { CategoryListDTO } from '../../models/category/category-list-dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { isNotNullOrEmpty } from '../../core/helper/validation-helper';
import { CategoryUpdateDTO } from '../../models/category/category-update-dto';
import { ResponseDTO } from '../../models/response-dto';
import { CardComponent } from '../../core/components/card/card.component';
import { PanelComponent } from '../../core/components/panel/panel.component';
import { InputComponent } from '../../core/components/input/input.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { TableComponent } from '../../core/components/table/table.component';
import { PmTableConfig } from '../../core/components/table/models/pm-table-config';
import { DialogComponent } from '../../core/components/dialog/dialog.component';
import { TextareaComponent } from "../../core/components/textarea/textarea.component";
import { SelectComponent } from '../../core/components/select/select.component';

@Component({
  selector: 'app-category',
  imports: [FormsModule, ReactiveFormsModule, CardComponent, PanelComponent, InputComponent, ButtonComponent, TableComponent, DialogComponent,
    TextareaComponent, SelectComponent, SwitchComponent],
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
  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  totalSubcategory: number = 0;
  table!: PmTableConfig;

  mockData = [
    {
      id: 1,
      name: 'Bebidas',
      type: 'Principal',
      primaryCategory: '',
      productsCount: 25,
      status: 'Ativo',
      createdAt: new Date(),
      categorySubTitle: 'Categoria de bebidas',
      categoryColor: '#3b82f6'
    },
    {
      id: 2,
      name: 'Sprite',
      type: 'Subcategoria',
      primaryCategory: 'Bebidas',
      productsCount: 10,
      status: 'Inativa',
      createdAt: new Date(),
      categorySubTitle: 'Subcategoria de Salgadinhos',
      categoryColor: '#10b981',
      primaryCategoryColor: '#3b82f6'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private categorySvc: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.table = PmTableConfig.create({
      name: 'category-table',
      columns: [
        { id: 'name', label: 'Categoria', type: 'text', dualTextColor: { title: 'name', subTitle: 'categorySubTitle', colorHEX: 'categoryColor' } },
        { id: 'type', label: 'Tipo', type: 'text', tag: { style: 'border-neutral-600', iconColor: 'text-neutral-600', icon: (category: any) => { return category.type === 'Principal' ? 'folder' : 'tags' } } },
        { id: 'primaryCategory', label: 'Categoria Pai', type: 'text', badgeColorHEX: 'primaryCategoryColor' },
        { id: 'productsCount', label: 'Produtos', type: 'numeric', suffix: ' produtos', tag: { style: 'bg-green-900/80 text-green-400 border-none' } },
        { id: 'status', label: 'Status', type: 'text', tag: { styleFunc: (category: any) => { return category.status === 'Ativo' ? 'bg-green-600 text-green-50 border-none' : 'bg-zinc-900 text-green-50 border-none' } } },
        { id: 'createdAt', label: 'Criado em', type: 'date' }
      ],
      buttons: [
        { title: 'Ações', icon: 'ellipsis' }
      ],
      data: this.mockData,
      globalFilter: true,
    });

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      category: [],
      active: []
    });

    this.listCategories();
  }

  setStatusFilter(filter: 'all' | 'active' | 'inactive'): void {
    this.statusFilter = filter;
  }

  listCategories() {
    this.loading = true;
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 10 };

    this.categorySvc.listCategory(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.categories = response.items as CategoryListDTO[];
        this.loading = false;
      }
    });
  }

  showDialogRegister() {
    this.categoryDialog = true;
    this.categoryForm.reset();
  }

  saveCategory() {
    if (this.categoryForm.invalid)
      return;

    this.categorySvc.registerCategory(this.categoryForm.value).subscribe({
      next: (response: ResponseDTO) => {
        if (!response.success) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: `${response.message}`, life: 5000 });
          return;
        }

        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `${response.message}`, life: 3000 });
        this.categoryDialog = false;
        this.listCategories();
      }
    });
  }

  clearFilters(table: any) {
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
            if (!response.success) {
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
            if (!response.success) {
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
