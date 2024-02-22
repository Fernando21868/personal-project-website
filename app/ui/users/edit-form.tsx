'use client';

import Link from 'next/link';
import {
  AtSymbolIcon,
  KeyIcon,
  PhotoIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createUser, updateUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { lusitana } from '../fonts';
import { User } from '@/app/lib/definitions';
import { useState } from 'react';
import { Session } from 'next-auth';

export default function FormEditUser({
  user,
  userAuth,
}: {
  user: User;
  userAuth: User;
}) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);
  const [fileName, setFileName] = useState('Upload a file');
  const handleFileChange = (event: any) => {
    setFileName(event.target.files[0].name);
  };

  return (
    <form action={dispatch}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Form to update an account.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                defaultValue={user.email}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="firstName"
            >
              First Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your First Name"
                required
                defaultValue={user.firstName}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="middleName"
            >
              Middle Name (Optional)
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="middleName"
                type="text"
                name="middleName"
                placeholder="Enter your Middle Name"
                defaultValue={user.middleName!}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your Last Name"
                required
                defaultValue={user.lastName!}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="lastName"
            >
              Role
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={user.role!}
                aria-describedby="customer-error"
                disabled={userAuth.role === 'ADMIN' ? false : true}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="USER">User</option>
                <option value="ADMIN">Administrator</option>
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="border-Kilamanjaro-950 mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="image"
                  className="relative mx-auto cursor-pointer rounded-md font-semibold hover:underline"
                >
                  <span className="">{fileName}</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update User</Button>
      </div>
    </form>
  );
}
