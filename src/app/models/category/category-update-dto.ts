export interface CategoryUpdateDTO {
  idCategory: number;
  idCompany: number;
  name: string;
  description?: string;
  active: boolean;
}
