export interface CategoryListDTO {
  idCategory: number;
  idCompany: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}
