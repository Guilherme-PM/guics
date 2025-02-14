import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ImportsModule } from '../../imports/imports';
import { ProductUpdateDTO } from '../../models/product/product-update-dto';
import { ProductListDTO } from '../../models/product/product-list-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryListDTO } from '../../models/subcategory/subcategory-list-dto';
import { ProductService } from '../../services/product/product.service';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-product',
  imports: [ImportsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  layout: 'list' | 'grid' = 'list';

  products: ProductListDTO[] = [];

  options = ['list', 'grid'];

  data: any;

  selectedProducts: ProductUpdateDTO[] = [];
  loading: boolean = false;
  searchValue: string | undefined;
  productDialog: boolean = false;
  productForm!: FormGroup;
  subcategories: SubcategoryListDTO[] = [];
  uploadedImages: any[] = []; // Imagens carregadas
  files!: any[];
  totalSize : number = 0;

  totalSizePercent : number = 0;
  activeStep: number = 1;

  constructor(
    private formBuilder: FormBuilder, 
    private productSvc: ProductService, 
    private messageService: MessageService, 
    private config: PrimeNG,
    private cdr: ChangeDetectorRef) 
  {
    this.productForm = this.formBuilder.group({
      idCategory: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      images: [[], Validators.required],  // Para garantir que pelo menos uma imagem seja carregada
      mainImageIndex: [null]  // Para armazenar o índice da imagem principal
    });
  }

  goToStep(step: number) {
    this.activeStep = step;
    this.cdr.detectChanges(); // Força a detecção de mudanças
  }

  ngOnInit() {
  }

  showDialogRegister(){
    this.productDialog = true;
  }

  deleteSelectedProducts(){

  }

  clearFilters(table: any){

  }

  deleteProduct(product: ProductUpdateDTO){

  }

  // Evento disparado quando imagens são selecionadas
  onImageSelect(event: any) {
    this.uploadedImages = event.files;
    this.productForm.patchValue({ images: this.uploadedImages });
  }

  // Obtém as opções de imagens carregadas para o dropdown
  getImageOptions() {
    return this.uploadedImages.map((image, index) => ({
      name: image.name,
      value: index
    }));
  }

  // Função de salvar o produto
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