import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../pages/Index.tsx";
import Layout from "./Layout.tsx";
import AddMovie from "../pages/AddMovie.tsx";
import Movies from "../pages/Movies.tsx";
import AuthLogin from "../pages/AuthLogin.tsx";
import AuthCallback from "../pages/AuthCallback.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Layout />}>
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="movies" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
