'use client';

import { Product, User } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import placeholder from '../../../public/placeholder.jpg';
import { EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { addToCart } from '@/app/lib/data';

export default function Products({
  products,
  user,
}: {
  products: Product[];
  user: User;
}) {
  const handleAddToCart = async (userId: string, productId: string) => {
    try {
      await addToCart(userId, productId);
      alert('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-around">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="mt-4 overflow-hidden rounded shadow-lg hover:shadow-2xl"
          >
            <Image
              width={100}
              height={100}
              className="w-full"
              src={product.image || placeholder}
              alt={product.name}
            ></Image>
            <div className="px-4 py-4">
              <div className="mb-2 text-xl font-bold">{product.name}</div>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>
            <div className="px-4 pb-2 pt-4">
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                #{product.name}
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-gray-700">
                Price: ${product.price}
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-gray-700">
                Stock: {product.stock}
              </span>
            </div>
            <Link
              href={`/products/detail/${product.id}`}
              className="m-4 flex h-10 items-center rounded-lg bg-fuchsia-200 px-4 text-sm font-medium text-black transition-colors hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <EyeIcon className="mr-2 h-5"></EyeIcon>
              <span>View Product</span>{' '}
            </Link>
            {user !== undefined ? (
              <Link
                href={'#'}
                onClick={() => handleAddToCart(user.id, product.id)}
                className="m-4 flex h-10 items-center rounded-lg bg-fuchsia-200 px-4 text-sm font-medium text-black transition-colors hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <ShoppingCartIcon className="mr-2 h-5"></ShoppingCartIcon>
                <span>Add to Cart</span>{' '}
              </Link>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
