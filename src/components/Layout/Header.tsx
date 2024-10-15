import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../../assets/logo-no-bg-no-text.png";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <Navbar fluid className="drop-shadow-md">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="mr-3 h-8 sm:h-12" alt="Must Watch" />
          <span className="text-md self-center whitespace-nowrap font-semibold text-gray-900 sm:text-xl dark:text-gray-100">
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
    </header>
  );
}
