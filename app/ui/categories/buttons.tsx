import { deleteCategory, deleteUser } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateCategory() {
  return (
    <Link
      href="/dashboard/categories/create"
      className="flex h-10 items-center rounded-lg bg-fuchsia-200 px-4 text-sm font-medium text-black transition-colors hover:bg-fuchsia-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create category</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCategory({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/categories/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCategory({ id }: { id: string }) {
  const deleteCategoryWithId = deleteCategory.bind(null, id);
  return (
    <form action={deleteCategoryWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
