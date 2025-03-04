export interface StockAdjustmentListDTO {
  idStock: number;
  product: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  stockLevelDescription: string;
  updatedAt: Date;
}