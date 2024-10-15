/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "../css/index.css";
import logo from "../assets/logo-no-bg.png";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Link to="/movies">
          <img src={logo} className="logo" alt="Must Watch" />
        </Link>
      </div>
    </>
  );
}
