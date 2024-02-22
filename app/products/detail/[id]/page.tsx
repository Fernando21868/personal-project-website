import { fetchProductById } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);

  return (
    <div className="w-full">
      <h1
        className={`${lusitana.className} mb-8 text-center text-3xl md:text-4xl`}
      >
        Product: {product?.name}
      </h1>
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {product?.name}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {product?.description}
              </p>
              <div className="pb-2 pt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  #{product?.name}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  Price: ${product?.price}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-blue-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  Stock: {product?.stock}
                </span>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <Image
                width={200}
                height={200}
                src={product?.image as string}
                alt="About Us Image"
                className="rounded-lg object-cover shadow-md"
              ></Image>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
