import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../../imports/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryRegisterDTO } from '../../models/category/category-register-dto';
import { UserDTO } from '../../models/user-dto';
import { CategoryService } from '../../services/category/category.service';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';

@Component({
  selector: 'app-category',
  imports: [ImportsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categorys: any;
  loading: boolean = false;
  categoryForm!: FormGroup;
  user: UserDTO = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private formBuilder: FormBuilder, private categorySvc: CategoryService){ }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });

    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 10 };

    this.categorySvc.listCategory(paginator, this.user.idCompany).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.categorys = response.items;
      },
      error: (err) => {
        console.error('Erro ao exibir categorias:', err);
      },
    });
  }

  saveCategory(){
    if (this.categoryForm.invalid) 
      return;

    const newCategory: CategoryRegisterDTO = {
      idCompany: this.user.idCompany,
      ...this.categoryForm.value 
    };   
  
    this.categorySvc.registerCategory(newCategory).subscribe({
      next: (response) => {
        console.log('Categoria salva com sucesso:', response);
      },
      error: (err) => {
        console.error('Erro ao salvar categoria:', err);
      },
    });
  }

  clearFilters(event: any){

  }
}
