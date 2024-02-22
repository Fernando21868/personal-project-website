import NavHomePage from '../ui/home/sidenav-home';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <NavHomePage></NavHomePage>
      {children}
    </main>
  );
}
