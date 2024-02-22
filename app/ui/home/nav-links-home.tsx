'use client';

import {
  TagIcon,
  TicketIcon,
  UserIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { User } from '@/app/lib/definitions';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home Page', href: '/', icon: HomeIcon },
  { name: 'Profile', href: '/profile/shopping-cart', icon: UserIcon },
  { name: 'Categories', href: '/categories', icon: TagIcon },
  { name: 'Products', href: '/products', icon: TicketIcon },
  { name: 'Log In', href: '/login', icon: UserIcon },
  { name: 'Sign Up', href: '/signup', icon: UserIcon },
  { name: 'Admin', href: '/dashboard', icon: UserCircleIcon },
];

export default function NavLinksHomePage({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if (
          (link.name === 'Log In' || link.name === 'Sign Up') &&
          (user === null || user === undefined)
        ) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }
        if (
          link.name === 'Categories' ||
          link.name === 'Products' ||
          link.name === 'Home Page'
        ) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }
        if (link.name === 'Profile' && user) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }
        if (link.name === 'Admin' && user && user.role === 'ADMIN') {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }
      })}
    </>
  );
}
