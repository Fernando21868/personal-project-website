import { redirect } from 'next/navigation';
import { fetchUserById } from '@/app/lib/data';
import FormEditUser from '@/app/ui/users/edit-form';
import { auth, getUser } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';

export default async function Page({ params }: { params: { id: string } }) {
  const userAuth = await auth();
  const userEmail = userAuth?.user?.email as string;
  const userByEmail = await getUser(userEmail);
  if (userByEmail?.role !== 'ADMIN') {
    redirect('/');
  }

  const id = params.id;

  const [user] = await Promise.all([fetchUserById(id)]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Edit User',
            href: `/dashboard/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FormEditUser user={user!} userAuth={userByEmail!} />
    </main>
  );
}
