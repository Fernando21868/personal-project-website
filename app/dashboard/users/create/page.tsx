import Breadcrumbs from '@/app/ui/breadcrumbs';
import FormCreateUser from '@/app/ui/users/create-form';
import { auth, getUser } from '@/auth';
import { redirect } from 'next/navigation';

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
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Create User',
            href: '/dashboard/users/create',
            active: true,
          },
        ]}
      />
      <FormCreateUser></FormCreateUser>
    </main>
  );
}
