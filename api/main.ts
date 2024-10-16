import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import { errorHandler, middleware } from "supertokens-node/framework/express";
import express from "npm:express";
import cors from "npm:cors";

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://auth.int.golikov.lu",
    apiKey: Deno.env.get("SUPERTOKENS_API_KEY"),
  },
  appInfo: {
    appName: "MustWatch",
    apiDomain: "https://mustwatch.golikov.lu",
    websiteDomain: "https://mustwatch.golikov.lu",
    apiBasePath: "/api/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: "github",
              clients: [
                {
                  clientId: String(Deno.env.get("GITHUB_AUTH_CLIENT_ID")),
                  clientSecret: String(
                    Deno.env.get("GITHUB_AUTH_CLIENT_SECRET"),
                  ),
                },
              ],
            },
          },
        ],
      },
    }),
    Session.init(),
  ],
});

const app = express();

app.use(
  cors({
    origin: "https://mustwatch.golikov.lu",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
);

app.use(middleware());
app.use(errorHandler());