import NavHomePage from '../ui/home/sidenav-home';
import NavLinksProfile from '../ui/profile/nav-links-profile';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full flex-col p-6">
      <NavHomePage></NavHomePage>
      <div className="flex flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
              <NavLinksProfile />
              <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            </div>
          </div>
        </div>
        <div className="flex-grow p-4 md:overflow-y-auto md:p-12 md:pt-4">
          {children}
        </div>
      </div>
    </main>
  );
}
