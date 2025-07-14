import { ChangeDetectorRef, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ProductUpdateDTO } from '../../models/product/product-update-dto';
import { ProductListDTO } from '../../models/product/product-list-dto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubcategoryListDTO } from '../../models/subcategory/subcategory-list-dto';
import { ProductService } from '../../services/product/product.service';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { SubcategoryService } from '../../services/subcategory/subcategory.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PaginatorDTO } from '../../models/paginator/paginator-dto';
import { PaginatedResultDTO } from '../../models/paginator/paginated-result-dto';
import { PanelComponent } from '../../core/components/panel/panel.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { CardComponent } from '../../core/components/card/card.component';
import { TableComponent } from '../../core/components/table/table.component';
import { InputComponent } from '../../core/components/input/input.component';
import { SelectComponent } from '../../core/components/select/select.component';
import { PmTableConfig } from '../../core/components/table/models/pm-table-config';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelComponent, ButtonComponent, CardComponent, TableComponent, InputComponent,
    SelectComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  products: ProductListDTO[] = [];
  selectedProducts: ProductUpdateDTO[] = [];
  loading: boolean = false;
  searchValue: string | undefined;
  productDialog: boolean = false;
  productForm!: FormGroup;
  subcategories: SubcategoryListDTO[] = [];
  uploadedImages: any[] = [];
  files!: any[];
  totalSize: number = 0;
  profitMargin: number = 0;
  profitMarginPercentage: number = 0;
  totalSizePercent : number = 0;
  activeStep: number = 1;
  dataChart!: any;
  optionsChart!: any;
  platformId = inject(PLATFORM_ID);
  totalProducts: number = 0;
  table!: PmTableConfig;
  mockData1 = [
    {
      id: 1,
      name: 'Bebidas'
    },
    {
      id: 2,
      name: 'Alimentos'
    }
  ];

  mockData2 = [
    {
      id: 1,
      name: 'Ativo'
    },
    {
      id: 2,
      name: 'Inativo'
    }
  ];

  mockData = [
    {
      name: 'Coca Cola KS 290ml',
      supplier: 'Distribuidora da Coca Cola',
      sku: 'SAMS24-128',
      barcode: '7891234567890',
      category: 'Bebidas',
      subcategory: 'Refrigerantes',
      sellingPrice: 5.99,
      costPrice: 3.50,
      margin: 2.49,
      stock: 45,
      minStock: 10,
      maxStock: 80,
      ncm: '85171231',
      status: 1
    }
  ];

  constructor(
    private formBuilder: FormBuilder, 
    private productSvc: ProductService, 
    private messageService: MessageService, 
    private config: PrimeNG,
    private subcategorySvc: SubcategoryService,
    private cd: ChangeDetectorRef) 
  {
    this.productForm = this.formBuilder.group({
      idSubcategory: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],
      sellingPrice: [null, Validators.required],
      costPrice: [null],
      sku: [''],
   //   mainImageIndex: [1]
    });
  }

  ngOnInit() {
    this.table = PmTableConfig.create({
      name: 'category-table',
      columns: [
        { id: 'name', label: 'Produto', type: 'text',
          dualText: {
            title: 'name',
            subTitle: 'supplier'
          }
         },
        { id: 'sku', label: 'SKU', type: 'text', copy: true, code: true,
          tag: {
            class: 'bg-[#0c1b12] border-none rounded-none'
          }
         },
        { id: 'barcode', label: 'Código de Barras', type: 'text', copy: true, icon: 'barcode', code: true },
        { id: 'category', label: 'Categoria', type: 'numeric',
          dualText: {
            title: 'category',
            subTitle: 'subcategory',
            class: {
              title: 'text-white',
              subtitle: 'text-red-400'
            }
          }
         },
        { id: 'sellingPrice', label: 'Preços' },
        { id: 'stock', label: 'Estoque', type: 'numeric' },
        { id: 'ncm', label: 'NCM', type: 'text', code: true,
          tag: {
            class: 'bg-[#0e1625] border-none rounded-none'
          }
         },
        { id: 'status', label: 'Status', 
          tag: { 
            text: (product: any) => product.status === 1 ? 'Ativo' : 'Inativo',
            styleFunc: (product: any) => 
              { 
                return product.status === 1 ? 'bg-green-600 text-green-50 border-none' : 'bg-zinc-900 text-green-50 border-none' } 
              } 
            }
      ],
      buttons: [
        { title: 'Ações', icon: 'ellipsis' }
      ],
      data: this.mockData,
    });

    this.listProducts();
  }

  onPageChange(event: any){
    const paginator: PaginatorDTO = { pageNumber: event.rows, pageSize: 10 };

    this.productSvc.listProducts(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.products = response.items as any;
      }
    });
  }

  listProducts(){
    const paginator: PaginatorDTO = { pageNumber: 1, pageSize: 10 };

    this.productSvc.listProducts(paginator).subscribe({
      next: (response: PaginatedResultDTO) => {
        this.products = response.items as any;
      }
    });
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataChart = {
            labels: ['Preço de Custo', 'Margem de Lucro'],
            datasets: [
                {
                    label: 'R$',
                    data: [this.productForm.value.costPrice, this.profitMargin],
                    backgroundColor: [documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-red-400'), documentStyle.getPropertyValue('--p-green-400')]
                }
            ]
        };

        this.optionsChart = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
        this.cd.markForCheck()
    }

}

  showDialogRegister(){
    this.listSubcategories();
    this.productDialog = true;
  }

  listSubcategories() {
    this.subcategorySvc.getAllCategoriesWithSubcategoriesAsync().subscribe({
      next: (response: any) => {
        this.subcategories = response;
      },
      error: (err) => {
        console.error('Erro ao carregar as subcategorias', err);
      }
    });
  }

  marginCalculate(){
    const costPrice = this.productForm.value.costPrice;
    const sellingPrice = this.productForm.value.sellingPrice;

    if (costPrice && sellingPrice) {
      this.profitMargin = sellingPrice - costPrice;
      this.profitMarginPercentage = (this.profitMargin / costPrice) * 100;
      this.initChart();
    } else {
      this.profitMargin = 0;
      this.profitMarginPercentage = 0;
    }
  }

  onInputProfitMargin() {
    const costPrice = this.productForm.value.costPrice;
  
    if (costPrice && this.profitMargin) {
      const sellingPrice = costPrice + this.profitMargin;

      this.productForm.patchValue({
        sellingPrice: sellingPrice
      });
  
      this.profitMarginPercentage = (this.profitMargin / costPrice) * 100;
      this.initChart();
    }
  }
  
  onInputProfitMarginPercentage() {
    const costPrice = this.productForm.value.costPrice;
  
    if (costPrice && this.profitMarginPercentage) {
      this.profitMargin = (this.profitMarginPercentage / 100) * costPrice;
      this.initChart();

      const sellingPrice = costPrice + this.profitMargin;

      this.productForm.patchValue({
        sellingPrice: sellingPrice
      });
    }
  }

  deleteSelectedProducts(){

  }

  clearFilters(table: any){

  }

  deleteProduct(product: ProductUpdateDTO){

  }

  onImageSelect(event: any) {
    this.uploadedImages = event.files;
    this.productForm.patchValue({ images: this.uploadedImages });
  }

  getImageOptions() {
    return this.uploadedImages.map((image, index) => ({
      name: image.name,
      value: index
    }));
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.productSvc.registerProduct(this.productForm.value).subscribe(response => {
        this.productDialog = false;
      }, error => {
      });
    }
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: any) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event: any) {
      this.files = event.currentFiles;
      this.files.forEach((file) => {
        this.totalSize += parseInt(this.formatSize(file.size) || '0');
      });

      this.totalSizePercent = this.totalSize / 10;

      this.productForm.patchValue({ images: [this.files] });
  }

  uploadEvent(callback: any) {
      callback();
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;

    if(sizes == undefined)
      return '0';
    
    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  choose(event: any, callback: any) {
    callback();
  }
}