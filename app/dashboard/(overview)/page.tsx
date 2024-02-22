import { lusitana } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { redirect } from 'next/navigation';
import administration from '../../../public/administration.jpg';
import Image from 'next/image';

export default async function Page() {
  const user = await auth();
  const userEmail = user?.user?.email as string;
  const userByEmail = await getUser(userEmail);
  if (userByEmail?.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <main className="container mx-auto px-4">
      <h1
        className={`${lusitana.className} mb-8 text-center text-3xl md:text-4xl`}
      >
        Jujuy Kiosk
      </h1>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <Image
            src={administration}
            alt="Hero"
            className="h-auto w-auto rounded-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="mb-4 text-2xl md:text-3xl">
            Sections to manage human resources, products and categories.
          </h2>
          <p className="mb-4">
            In this section you can manage the different resources that your
            microenterprise has, create, delete, update and view products,
            categories and users.
          </p>
        </div>
      </div>
    </main>
  );
}
