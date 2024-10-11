import logo from "./assets/logo-no-bg.png";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Link to="/movies">
          <img src={logo} className="logo" alt="Must Watch" />
        </Link>
      </div>
    </>
  );
}

export default App;
