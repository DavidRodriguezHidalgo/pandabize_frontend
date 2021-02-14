import useOrders from "../../hooks/useOrders";
import Order from "./Order";

const Orders = () => {
  const [orders, setOrders] = useOrders();
  return (
    <div className="container">
      <h3>Orders</h3>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
