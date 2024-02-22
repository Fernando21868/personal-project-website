import { Category } from '@/app/lib/definitions';
import { DeleteCategory, UpdateCategory } from './buttons';
import Image from 'next/image';
import placeholder from '../../../public/placeholder.jpg';

export default async function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          <table className="flex-no-wrap my-5 flex w-full flex-row overflow-hidden rounded-lg sm:inline-table sm:bg-white sm:shadow-lg">
            <thead className="text-white">
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="flex-no wrap mb-2 flex flex-col rounded-l-lg bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 text-black sm:mb-0 sm:table-row sm:rounded-none sm:[&:not(:last-child)]:hidden"
                >
                  <th className="h-20 p-3 text-left sm:text-center">
                    Category Image
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">Name</th>
                  <th className="h-20 p-3 text-left sm:text-center">
                    Description
                  </th>
                  <th className="h-20 p-3 text-left sm:text-center">Actions</th>
                </tr>
              ))}
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="flex-no wrap mb-2 flex flex-col text-right sm:mb-0 sm:table-row sm:text-center"
                >
                  <td className="border-grey-light flex h-20 justify-end border p-3 sm:justify-center">
                    {category.image !== null &&
                    category.image !== undefined &&
                    category.image !== '' ? (
                      <Image
                        width={30}
                        height={30}
                        src={category.image as string}
                        alt={category.name}
                        className="h-10 w-10 flex-shrink-0 rounded-full"
                      ></Image>
                    ) : (
                      <Image
                        width={30}
                        height={30}
                        src={placeholder}
                        alt={'placeholder'}
                        className="h-10 w-10 flex-shrink-0 rounded-full"
                      ></Image>
                    )}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {category.name}
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    {category.description?.substring(0, 20) as string}...
                  </td>
                  <td className="border-grey-light h-20 border p-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCategory id={category.id}></UpdateCategory>
                      <DeleteCategory id={category.id}></DeleteCategory>
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
