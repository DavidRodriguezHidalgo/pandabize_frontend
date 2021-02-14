import useBrand from "../../hooks/useBrand";
import Brand from "./Brand";

const Brands = () => {
  const [brands] = useBrand();

  return (
    <>
      {brands.map((brand) => (
        <Brand key={brand.id} brand={brand} />
      ))}
    </>
  );
};

export default Brands;
