export interface SubcategoryListDTO {
  idSubcategory: number;
  idCategory: number;
  idCompany: number;
  category: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}
