import {
  addToCart,
  fetchCategoryById,
  fetchProducts,
  fetchProductsPages,
  fetchProductsPerCategoryId,
} from '@/app/lib/data';
import { Category, Product, User } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/pagination';
import Products from '@/app/ui/products-home/products';
import Search from '@/app/ui/search';
import { auth, getUser } from '@/auth';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
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

  const handleAddToCart = async (userId: string, productId: string) => {
    try {
      await addToCart(userId, productId);
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const id = params.id;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);
  let products: Product[] | undefined = undefined;
  let category: Category | null = null;
  try {
    products = await fetchProductsPerCategoryId(query, currentPage, id);
    category = await fetchCategoryById(id);
  } catch (error) {
    if (products === null || products === undefined) {
      products = await fetchProducts(query, currentPage);
    }
  }

  return (
    <div className="w-full">
      <h1
        className={`${lusitana.className} mb-8 text-center text-3xl md:text-4xl`}
      >
        {category ? `Products Per Category: ${category.name}` : 'All Products'}
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
