export interface Order {
  id: number;
  amount: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  quantity: number;
  selectedFeatures: SelectedFeature[];
}

interface SelectedFeature {
  feature: string;
  featureValue: string;
}
