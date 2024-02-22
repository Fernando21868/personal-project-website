import ShoppingCart from '../../ui/profile/shopping-cart';
import { auth, getUser } from '@/auth';
import { Product, User } from '../../lib/definitions';
import { getCartProducts } from '../../lib/data';
import { lusitana } from '../../ui/fonts';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

export default async function ShoppingCartPage() {
  const user = await auth();
  let userByEmail: User | undefined;
  let products: Product[] | undefined | null = undefined;
  if (user === undefined || user === null) {
    userByEmail = undefined;
    redirect('/');
  } else {
    const userEmail = user?.user?.email as string;
    userByEmail = await getUser(userEmail);
    products = await getCartProducts(userByEmail?.id!);
  }

  return (
    <>
      {products?.length !== 0 ? (
        <ShoppingCart products={products!}></ShoppingCart>
      ) : (
        <h1
          className={`${lusitana.className} mb-8 text-center text-xl md:text-2xl`}
        >
          No product added to shopping cart
        </h1>
      )}
    </>
  );
}
