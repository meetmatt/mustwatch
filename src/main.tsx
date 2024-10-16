import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, { Github } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

import "./main.css";
import App from "./components/App.tsx";

SuperTokens.init({
  appInfo: {
    appName: "MustWatch",
    apiDomain: String(import.meta.env.VITE_AUTH_API_DOMAIN),
    websiteDomain: String(import.meta.env.VITE_AUTH_WEBSITE_DOMAIN),
    apiBasePath: "/api/auth",
    websiteBasePath: "/auth",
  },
  style: `
      [data-supertokens~=headerSubtitle],
      [data-supertokens~=dividerWithOr],
      [data-supertokens~=superTokensBranding],
      form {
          display: none;
      }
  `,
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [Github.init()],
      },
    }),
    EmailPassword.init({
      override: {
        functions: (originalImplementation: RecipeInterface) => {
          return {
            ...originalImplementation,
            signUpPOST: undefined,
          };
        },
      },
    }),
    Session.init(),
  ],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SuperTokensWrapper>
      <App />
    </SuperTokensWrapper>
  </StrictMode>,
);