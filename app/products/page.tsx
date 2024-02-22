import { auth, getUser } from '@/auth';
import { addToCart, fetchProducts, fetchProductsPages } from '../lib/data';
import { Product, User } from '../lib/definitions';
import { lusitana } from '../ui/fonts';
import Pagination from '../ui/pagination';
import Products from '../ui/products-home/products';
import Search from '../ui/search';

export default async function ProductsHomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const user = await auth();
  let userByEmail: User | undefined;
  if (user === undefined || user === null) {
    userByEmail = undefined;
  } else {
    const userEmail = user?.user?.email as string;
    userByEmail = await getUser(userEmail);
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);

  const products: Product[] = await fetchProducts(query, currentPage);

  return (
    <div className="w-full">
      <h1
        className={`${lusitana.className} mb-8 text-center text-3xl md:text-4xl`}
      >
        Products
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
      </div>
      <div>
        <Products products={products} user={userByEmail!}></Products>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
