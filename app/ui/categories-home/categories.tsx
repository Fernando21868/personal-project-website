import { Category } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default function Categories({
  categories,
  countProducts,
}: {
  categories: Category[];
  countProducts: {
    idCategory: string;
    quantityProducts: number;
  }[];
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-4 md:flex-row md:justify-around">
      {categories.map((category) => {
        return (
          <Link
            key={category.id}
            className="w-full max-w-sm hover:shadow-2xl"
            href={`/products/${category.id}`}
          >
            <div
              key={category.id}
              className="mt-4 overflow-hidden rounded shadow-lg"
            >
              <Image
                width={100}
                height={100}
                className="w-full"
                src={category.image!}
                alt={category.name}
              ></Image>
              <div className="px-6 py-4">
                <div className="mb-2 text-xl font-bold">{category.name}</div>
                <p className="text-base text-gray-700">
                  {category.description}
                </p>
              </div>
              <div className="px-6 pb-2 pt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  #{category.name}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  Quantity of Products: {''}
                  {
                    countProducts.find((countProduct) => {
                      return countProduct.idCategory === category.id;
                    })?.quantityProducts
                  }
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
