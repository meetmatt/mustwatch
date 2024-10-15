import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./main.css";

import Layout from "./components/Layout/Layout.tsx";
import Index from "./pages/Index.tsx";
import AddMovie from "./pages/AddMovie.tsx";
import Movies from "./pages/Movies.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/" element={<Layout />}>
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="movies" element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
