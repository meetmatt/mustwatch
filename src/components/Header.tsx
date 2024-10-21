import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../assets/logo-no-bg-no-text.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function Header() {
  const { loggedIn, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  });

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
      {loggedIn && user && <p>UserID: {user.userId}</p>}
    </header>
  );
}
