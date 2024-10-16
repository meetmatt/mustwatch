import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../pages/Index.tsx";
import Layout from "./Layout/Layout.tsx";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import AddMovie from "../pages/AddMovie.tsx";
import Movies from "../pages/Movies.tsx";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route
          path="/"
          element={
            <SessionAuth>
              <Layout />
            </SessionAuth>
          }
        >
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="movies" element={<Movies />} />
        </Route>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
          ThirdPartyPreBuiltUI,
          EmailPasswordPreBuiltUI,
        ])}
      </Routes>
    </BrowserRouter>
  );
}