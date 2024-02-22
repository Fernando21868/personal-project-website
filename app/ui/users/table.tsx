import { fetchUsers } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import { useEffect } from 'react';
import { Button } from '../button';
import { DeleteUser, UpdateUser } from './buttons';
import Image from 'next/image';
import placeholder from '../../../public/userdefault.png';

export default async function UsersTable({ users }: { users: User[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          <table className="flex-no-wrap my-5 flex w-full flex-row overflow-hidden rounded-lg sm:inline-table sm:bg-white sm:shadow-lg">
            <thead className="text-white">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="flex-no wrap mb-2 flex flex-col rounded-l-lg bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 text-black sm:mb-0 sm:table-row sm:rounded-none sm:[&:not(:last-child)]:hidden"
                >
                  <th className="h-20 p-3 text-left sm:text-center">
                    Profile Image
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">Email</th>
                  <th className="h-20 p-3 text-left sm:text-center">
                    First Name
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">
                    Middle Name
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">
                    Last Name
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">Role</th>
                  <th className="h-20 p-3 text-left sm:text-center">Actions</th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="flex-no wrap mb-2 flex flex-col text-right sm:mb-0 sm:table-row sm:text-center"
                >
                  <td className="border-grey-light flex h-20 justify-end border p-3 sm:justify-center">
                    {user.image !== null &&
                    user.image !== undefined &&
                    user.image !== '' ? (
                      <Image
                        width={40}
                        height={40}
                        src={user.image as string}
                        alt={user.firstName}
                        className="h-10 w-10 flex-shrink-0 rounded-full"
                      ></Image>
                    ) : (
                      <Image
                        width={40}
                        height={40}
                        src={placeholder}
                        alt={'placeholder'}
                        className="h-10 w-10 flex-shrink-0 rounded-full"
                      ></Image>
                    )}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {user.email}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {user.firstName}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {user.middleName}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {user.lastName}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {user.role}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUser id={user.id}></UpdateUser>
                      <DeleteUser id={user.id}></DeleteUser>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
