import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import NavHomePage from './ui/home/sidenav-home';
import heroMobile from '../public/hero-mobile.jpg';
import heroDesktop from '../public/hero-desktop.jpg';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <NavHomePage></NavHomePage>
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 p-4 md:h-52">
        <AcmeLogo></AcmeLogo>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            Welcome to our kiosk in Argentina! Conveniently situated in a
            bustling area, our kiosk offers a wide range of products to meet
            your everyday needs. From snacks and beverages to magazines and
            basic essentials, we have got you covered. Whether you are grabbing
            a quick bite on the go or picking up some last-minute items, our
            friendly staff are here to assist you. Come visit us and discover
            the convenience and variety our kiosk has to offer!
          </p>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src={heroDesktop}
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src={heroMobile}
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
