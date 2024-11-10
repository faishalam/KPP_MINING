import { RootLayoutProvider } from "@/providers/rootProviders/RootLayoutProviders";
import MobileSidebar from "../pages/RootComponents/MobileSidebar";
import DesktopSidebar from "../pages/RootComponents/DesktopSidebar";
import Navbar from "../pages/RootComponents/Navbar";

export default function RootLayoutComponents({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full max-w-full min-h-screen bg-gray-100">
        <RootLayoutProvider>
          <MobileSidebar />
          <DesktopSidebar />
          <Navbar />
        </RootLayoutProvider>
        <div className="lg:pl-72 w-full max-w-full">
          <main className="py-6 w-full max-w-full ">
            <div className="px-4 sm:px-6 lg:px-8 w-full">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
