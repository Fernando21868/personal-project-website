import { redirect } from 'next/navigation';
import { fetchAllCategories, fetchProductById } from '@/app/lib/data';
import FormEditProduct from '@/app/ui/products/edit-form';
import { Category } from '@prisma/client';
import { auth, getUser } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({ params }: { params: { id: string } }) {
  const user = await auth();
  const userEmail = user?.user?.email as string;
  const userByEmail = await getUser(userEmail);
  if (userByEmail?.role !== 'ADMIN') {
    redirect('/');
  }

  const id = params.id;

  const [product] = await Promise.all([fetchProductById(id)]);
  const categories: Category[] = await fetchAllCategories();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Edit product',
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FormEditProduct product={product!} categories={categories} />
    </main>
  );
}
