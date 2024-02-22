'use client';
import { removeProductFromCart } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';

export function DeleteProductFromShoppingCart({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  const deleteProductFromShoppingCart = removeProductFromCart.bind(
    null,
    userId,
    productId,
  );
  return (
    <form action={deleteProductFromShoppingCart}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
