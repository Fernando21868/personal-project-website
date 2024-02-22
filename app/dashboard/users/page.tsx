'use server';

import { fetchUsers, fetchUsersPages } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { CreateUser } from '@/app/ui/users/buttons';
import UsersTable from '@/app/ui/users/table';
import { auth, getUser } from '@/auth';
import { redirect } from 'next/navigation';

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const user = await auth();
  const userEmail = user?.user?.email as string;
  const userByEmail = await getUser(userEmail);
  if (userByEmail?.role !== 'ADMIN') {
    redirect('/');
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchUsersPages(query);

  const users: User[] = await fetchUsers(query, currentPage);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search users..." />
        <CreateUser />
      </div>
      <div>
        <UsersTable users={users}></UsersTable>
      </div>
      <div className="mt-5 flex w-full justify-end">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
