import { Product } from '@/app/lib/definitions';
import Image from 'next/image';
import placeholder from '../../../public/placeholder.jpg';
import { removeProductFromCart } from '@/app/lib/actions';
import { auth, getUser } from '@/auth';
import { TrashIcon } from '@heroicons/react/24/outline';
import { DeleteProductFromShoppingCart } from './delete-product';

export default async function ShoppingCart({
  products,
}: {
  products: Product[];
}) {
  let total = 0;
  products.forEach((product) => {
    total += product.price;
  });
  const user = await auth();
  const userEmail = user?.user?.email as string;
  const userByEmail = await getUser(userEmail);
  return (
    <div className="h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-3/4">
            <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Stock</th>
                    <th className="text-left font-semibold">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <Image
                              height={16}
                              width={16}
                              className="mr-4 h-16 w-16"
                              src={product.image ? product.image : placeholder}
                              alt="Product image"
                            ></Image>
                            <span className="font-semibold">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">${product.price}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <span className="w-8 text-center">
                              {product.stock}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <DeleteProductFromShoppingCart
                            userId={userByEmail?.id!}
                            productId={product.id}
                          ></DeleteProductFromShoppingCart>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Summary</h2>
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
