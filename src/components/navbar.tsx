import NextLink from "next/link";

interface LinkItemProps {
  href: string;
  path: string;
  children: React.ReactNode;
}

interface NavbarProps {
  path: string;
}

const LinkItem = ({ href, path, children }: LinkItemProps) => {
  const active = path === href;
  return (
    <NextLink className={active ? "text-yellow-500 underline" : ""} href={href}>
      {children}
    </NextLink>
  );
};

const Navbar = ({ path }: NavbarProps) => {
  return (
    <nav className="bg-gray-800 text-gray-100 p-3 flex flex-row-reverse gap-5">
      <LinkItem href="/orders" path={path}>
        Orders
      </LinkItem>
      <LinkItem href="/" path={path}>
        Brands
      </LinkItem>
    </nav>
  );
};

export default Navbar;
