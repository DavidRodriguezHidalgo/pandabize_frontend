import Brand from "@/components/Brand";
import { GET_BRANDS } from "@/graphql/queries";
import BrandType from "@/types/brand";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { data, loading, error } = useQuery(GET_BRANDS);

  const brands = data?.brands || [];
  if (loading) {
    return <div className="text-center font-bold">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center font-bold">Error loading the brands</div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      {brands.map((brand: BrandType) => (
        <Brand
          key={brand.id}
          id={brand.id}
          title={brand.name}
          price={brand.price}
        />
      ))}
    </div>
  );
}
