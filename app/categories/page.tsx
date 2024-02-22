import {
  fetchCategories,
  fetchCategoriesPages,
  fetchQuantityProductsPerCategory,
} from '../lib/data';
import { Category } from '../lib/definitions';
import Categories from '../ui/categories-home/categories';
import { lusitana } from '../ui/fonts';
import Pagination from '../ui/pagination';
import Search from '../ui/search';

export default async function ProductsHomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCategoriesPages(query);
  type TCountProduct = {
    idCategory: string;
    quantityProducts: number;
  };
  const categories: Category[] = await fetchCategories(query, currentPage);
  const countProductsPromises = categories.map(async (category) => {
    const quantityProducts = await fetchQuantityProductsPerCategory(
      category.id,
    );
    return {
      idCategory: category.id,
      quantityProducts: quantityProducts,
    };
  });
  const countProducts = await Promise.all(countProductsPromises);

  return (
    <div className="w-full">
      <h1
        className={`${lusitana.className} mb-8 text-center text-3xl md:text-4xl`}
      >
        Categories
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search categories..." />
      </div>
      <div>
        <Categories
          categories={categories}
          countProducts={countProducts}
        ></Categories>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
