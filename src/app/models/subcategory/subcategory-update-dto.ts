export interface SubcategoryUpdateDTO {
  idSubCategory: number;
  idCategory: number;
  idCompany: number;
  name: string;
  description?: string;
  active: boolean;
}
