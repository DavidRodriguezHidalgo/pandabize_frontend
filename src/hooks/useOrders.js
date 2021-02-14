import { useState, useEffect } from "react";
import OrdersService from "../services/data/orders_service";
import { createNotification } from "../services/notifications";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    OrdersService.loadOrders()
      .then((response) => setOrders(response.data))
      .catch((error) => createNotification("error", "Error retrieving orders"));
  }, []);
  return [orders, setOrders];
};

export default useOrders;
