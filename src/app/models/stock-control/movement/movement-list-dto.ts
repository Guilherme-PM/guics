export interface MovementListDTO {
  idStockMovement: number;
  product: string;
  quantity: number;
  typeDescription: string;
  reasonDescription: string;
  createdAt: Date;
}