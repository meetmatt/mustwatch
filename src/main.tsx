import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, { Github } from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";

import "./main.css";

import Layout from "./components/Layout/Layout.tsx";
import Index from "./pages/Index.tsx";
import AddMovie from "./pages/AddMovie.tsx";
import Movies from "./pages/Movies.tsx";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

SuperTokens.init({
  appInfo: {
    appName: "MustWatch",
    apiDomain: String(import.meta.env.VITE_AUTH_API_DOMAIN),
    websiteDomain: String(import.meta.env.VITE_AUTH_WEBSITE_DOMAIN),
    apiBasePath: "/api/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [Github.init()],
      },
    }),
    Session.init(),
  ],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/" element={<Layout />}>
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="movies" element={<Movies />} />
          </Route>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
            ThirdPartyPreBuiltUI,
            EmailPasswordPreBuiltUI,
          ])}
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  </StrictMode>,
);