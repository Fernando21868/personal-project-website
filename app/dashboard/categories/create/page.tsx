import FormCreateCategory from '@/app/ui/categories/create-form';
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

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Create Category',
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <FormCreateCategory></FormCreateCategory>
    </main>
  );
}
