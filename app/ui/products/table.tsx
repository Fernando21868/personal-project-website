import { Product } from '@/app/lib/definitions';
import { DeleteProduct, UpdateProduct } from './buttons';
import Image from 'next/image';
import placeholder from '../../../public/placeholder.jpg';

export default async function ProductsTable({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          <table className="flex-no-wrap my-5 flex w-full flex-row overflow-hidden rounded-lg sm:inline-table sm:bg-white sm:shadow-lg">
            <thead className="text-white">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="flex-no wrap mb-2 flex flex-col rounded-l-lg bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 text-black sm:mb-0 sm:table-row sm:rounded-none sm:[&:not(:last-child)]:hidden"
                >
                  <th className="h-20 p-3 text-left sm:text-center">
                    Product Image
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">Name</th>
                  <th className="h-20 p-3 text-left sm:text-center">
                    Description
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">Price</th>
                  <th className="h-20 p-3 text-left sm:text-center">Stock</th>
                  <th className="h-20 p-3 text-left sm:text-center">Actions</th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {products?.map((product) => (
                <tr
                  key={product.id}
                  className="flex-no wrap mb-2 flex flex-col text-right sm:mb-0 sm:table-row sm:text-center"
                >
                  <td className="border-grey-light flex h-20 justify-end border p-3 sm:justify-center">
                    {product.image !== null &&
                    product.image !== undefined &&
                    product.image !== '' ? (
                      <Image
                        width={40}
                        height={40}
                        src={product.image as string}
                        alt={product.name}
                        className="h-10 w-10 flex-shrink-0 rounded-full"
                      ></Image>
                    ) : (
                      <Image
                        width={40}
                        height={40}
                        src={placeholder}
                        alt={'placeholder'}
                        className="h-10 w-10 flex-shrink-0 rounded-full"
                      ></Image>
                    )}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {product.name}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {product.description?.substring(0, 20) as string}...
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {product.price}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {product.stock}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProduct id={product.id}></UpdateProduct>
                      <DeleteProduct id={product.id}></DeleteProduct>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
