import { redirect } from 'next/navigation';
import { fetchCategoryById } from '@/app/lib/data';
import FormEditCategory from '@/app/ui/categories/edit-form';
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

  const [category] = await Promise.all([fetchCategoryById(id)]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Edit Category',
            href: `/dashboard/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FormEditCategory category={category!}></FormEditCategory>
    </main>
  );
}
