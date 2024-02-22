'use server';

import { fetchProducts, fetchProductsPages } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';
import Pagination from '@/app/ui/pagination';
import { CreateProduct } from '@/app/ui/products/buttons';
import ProductsTable from '@/app/ui/products/table';
import Search from '@/app/ui/search';
import { auth, getUser } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const user = await auth();
  const userEmail = user?.user?.email as string;
  const userByEmail = await getUser(userEmail);
  if (userByEmail?.role !== 'ADMIN') {
    redirect('/');
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);

  const products: Product[] = await fetchProducts(query, currentPage);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <div>
        <ProductsTable products={products}></ProductsTable>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
