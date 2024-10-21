import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Flowbite } from "flowbite-react";

export default function Layout() {
  return (
    <Flowbite>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Flowbite>
  );
}
