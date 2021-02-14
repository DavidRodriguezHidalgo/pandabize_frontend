const Order = ({ order }) => {
  return (
    <div className="order" key={order.id}>
      <div>
        <span>Order id {order.id}</span>
        <span style={{ float: "right" }}>Total: {order.amount} €</span>
      </div>
      <div>
        <ul>
          {order.items.map((item) => {
            return (
              <li className="order-item-row">
                <div>
                  <h4>{item.product}</h4>
                  <span>
                    {item.quantity} x {item.price} €
                  </span>
                </div>
                <div className="order-item-features">
                  <h4>Custom features: </h4>
                  {item.selected_features.map((feature) => {
                    return (
                      <div>
                        {`${feature.feature} - ${feature.feature_value}`}
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Order;
