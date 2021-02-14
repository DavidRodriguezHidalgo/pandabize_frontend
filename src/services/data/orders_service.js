import axios from "../axios.js";

class OrdersService {
  static createOrder = (product, quantity, selected_features) => {
    return axios.post("/orders", {
      order: {
        items: [
          {
            product: product.name,
            quantity: quantity,
            price: product.price,
            selected_features: selected_features.map((feature) => {
              return {
                feature: feature.name,
                feature_value: feature.value,
              };
            }),
          },
        ],
      },
    });
  };
  static loadOrders = () => axios.get("/orders");
}

export default OrdersService;
