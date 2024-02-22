import { redirect } from 'next/navigation';
import { fetchUserById } from '@/app/lib/data';
import FormEditUser from '@/app/ui/users/edit-form';
import { auth, getUser } from '@/auth';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { User } from '@/app/lib/definitions';

export default async function AccountPage() {
  const userAuth = await auth();
  let userByEmail: User | undefined | null;
  if (userAuth === undefined || userAuth === null) {
    redirect('/');
  } else {
    const userEmail = userAuth?.user?.email as string;
    userByEmail = await getUser(userEmail);
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home Page', href: '/' },
          {
            label: 'Edit User',
            href: `/profile/account`,
            active: true,
          },
        ]}
      />
      <FormEditUser user={userByEmail!} userAuth={userByEmail!} />
    </main>
  );
}
