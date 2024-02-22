import { PowerIcon } from '@heroicons/react/24/outline';
import { auth, getUser, signOut } from '@/auth';
import NavLinksHomePage from './nav-links-home';
import { User } from '@/app/lib/definitions';

export default async function NavHomePage() {
  let isUserLoggedIn = false;
  const user = await auth();
  let userEmail: string = '';
  let userByEmail: User | undefined;
  if (user) {
    userEmail = user?.user?.email as string;
    userByEmail = await getUser(userEmail);
    isUserLoggedIn = true;
  }

  return (
    <div className="flex h-full flex-col px-3 pb-4 pt-0 md:px-2">
      <div className="flex grow flex-row justify-end space-x-2 bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
        <NavLinksHomePage user={userByEmail!}></NavLinksHomePage>
        {isUserLoggedIn ? (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-inherit p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
