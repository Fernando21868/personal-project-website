import FormCreateProduct from '@/app/ui/products/create-form';
import { Category } from '@prisma/client';
import { fetchAllCategories } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import { auth, getUser } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page() {
  const user = await auth();
  const userEmail = user?.user?.email as string;
  const userByEmail = await getUser(userEmail);
  if (userByEmail?.role !== 'ADMIN') {
    redirect('/');
  }

  const categories: Category[] = await fetchAllCategories();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Invoice',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <FormCreateProduct categories={categories}></FormCreateProduct>
    </main>
  );
}
