'use server';

import { fetchCategories, fetchCategoriesPages } from '@/app/lib/data';
import { Category, User } from '@/app/lib/definitions';
import { CreateCategory } from '@/app/ui/categories/buttons';
import CategoriesTable from '@/app/ui/categories/table';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { auth, getUser } from '@/auth';
import { redirect } from 'next/navigation';

export default async function CategoriesPage({
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

  const totalPages = await fetchCategoriesPages(query);

  const categories: Category[] = await fetchCategories(query, currentPage);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search categories..." />
        <CreateCategory />
      </div>
      <div>
        <CategoriesTable categories={categories}></CategoriesTable>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
