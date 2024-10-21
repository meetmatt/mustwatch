import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Flowbite } from "flowbite-react";

export default function Layout() {
  return (
    <Flowbite>
      <Header />
      <main className="min-h-[calc(100vh-160px)] bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
      <Footer />
    </Flowbite>
  );
}
