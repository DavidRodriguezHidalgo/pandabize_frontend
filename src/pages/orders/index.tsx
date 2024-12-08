import { GET_BRANDS, GET_ORDERS } from "@/graphql/queries";
import BrandType from "@/types/brand";
import { Order } from "@/types/orders";
import { useQuery } from "@apollo/client";

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);

  const {
    data: brandsData,
    loading: loadingBrands,
    error: errorBrands,
  } = useQuery(GET_BRANDS);

  const brands = brandsData?.brands || [];

  const orders = data?.orders || [];
  if (loading || loadingBrands) {
    return <div className="text-center font-bold">Loading...</div>;
  }
  if (error || errorBrands) {
    return <div className="text-center font-bold">Error loading</div>;
  }

  const getBrandName = (productId: number) => {
    const brand = brands.find((brand: BrandType) => brand.id === productId);
    return brand?.name;
  };

  return (
    <div className="flex flex-col gap-12">
      {orders.map((order: Order) => (
        <div
          key={order.id}
          className="flex flex-col px-12 border p-4 rounded-xl"
        >
          <div>Order number: {order.id}</div>

          <div className="flex flex-row gap-32">
            <div>
              Items:
              <div key={order.items[0].productId}>
                <div>
                  {`${getBrandName(order.items[0].productId)} x ${
                    order.items[0].quantity
                  }`}
                </div>
              </div>
            </div>

            <div>
              Features:
              <div>
                {order.items[0].selectedFeatures.map((feature) => (
                  <div key={feature.feature}>
                    {`${feature.feature}: ${feature.featureValue}`}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="float-end">{order.amount} €</div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
