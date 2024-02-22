'use client';

import Link from 'next/link';
import {
  AtSymbolIcon,
  KeyIcon,
  PhotoIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateProduct } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { lusitana } from '../fonts';
import { Category, Product, User } from '@/app/lib/definitions';
import { useState } from 'react';

export default function FormEditProduct({
  product,
  categories,
}: {
  product: Product;
  categories: Category[];
}) {
  const initialState = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useFormState(updateProductWithId, initialState);
  const [fileName, setFileName] = useState('Upload a file');
  const handleFileChange = (event: any) => {
    setFileName(event.target.files[0].name);
  };

  return (
    <form action={dispatch}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Form to create a product.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter name"
                required
                defaultValue={product.name}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="description"
            >
              Description
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="description"
                type="text"
                name="description"
                placeholder="Enter description"
                required
                defaultValue={product.description!}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="price"
            >
              Price
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="price"
                type="number"
                name="price"
                placeholder="Enter price"
                defaultValue={+product.price!}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="stock"
            >
              Stock
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="stock"
                type="number"
                name="stock"
                placeholder="Enter stock"
                required
                defaultValue={+product.stock!}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="lastName"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="categoryId"
                name="categoryId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="border-Kilamanjaro-950 mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="image"
                  className="relative mx-auto cursor-pointer rounded-md font-semibold hover:underline"
                >
                  <span className="">{fileName}</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Product</Button>
      </div>
    </form>
  );
}
