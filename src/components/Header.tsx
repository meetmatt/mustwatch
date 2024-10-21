import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../assets/logo-no-bg-no-text.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      const meResponse = await fetch(
        `${import.meta.env.VITE_API_HOST}auth/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
        },
      );
      const me = await meResponse.json();
      setUserId(me.userId);
    })();
  }, []);

  return (
    <header>
      <Navbar fluid className="drop-shadow-md">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="mr-3 h-8 sm:h-12" alt="Must Watch" />
          <span className="text-md self-center whitespace-nowrap font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
            Must Watch
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button as={Link} to="/add-movie">
            Add Movie
          </Button>
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={NavLink} to="/" active={location.pathname === "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link
            as={NavLink}
            to="/movies"
            active={location.pathname === "/movies"}
          >
            Movies
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {userId && <p>UserID: {userId}</p>}
    </header>
  );
}
