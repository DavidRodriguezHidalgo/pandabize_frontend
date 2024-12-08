import NextLink from "next/link";

interface BrandProps {
  id: number;
  title: string;
  price: number;
}

const Brand = ({ title, price, id }: BrandProps) => {
  return (
    <NextLink href={`/brands/${id}`}>
      <div className="text-center border p-4 rounded-xl">
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm">{price} €</div>
        </div>
      </div>
    </NextLink>
  );
};

export default Brand;
