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
    apiKey: String(Deno.env.get("SUPERTOKENS_API_KEY")),
  },
  appInfo: {
    appName: "MustWatch",
    apiDomain: String(Deno.env.get("AUTH_API_DOMAIN")),
    websiteDomain: String(Deno.env.get("AUTH_WEBSITE_DOMAIN")),
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
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signInUp: async function (input) {
              // First we call the original implementation of signInUp.
              const response = await originalImplementation.signInUp(input);

              // Post sign up response, we check if it was successful
              if (response.status === "OK") {
                console.log(response);
                let { id, emails } = response.user;
                // if (emails[0] !== String(Deno.env.get("AUTH_ALLOWED_EMAILS"))) {
                //
                // }

                // This is the response from the OAuth 2 provider that contains their tokens or user info.
                let providerAccessToken = response.oAuthTokens["access_token"];
                let firstName =
                  response.rawUserInfoFromProvider.fromUserInfoAPI![
                    "first_name"
                  ];

                if (input.session === undefined) {
                  if (
                    response.createdNewRecipeUser &&
                    response.user.loginMethods.length === 1
                  ) {
                    // TODO: Post sign up logic
                  } else {
                    // TODO: Post sign in logic
                  }
                }
              }
              return response;
            },
          };
        },
      },
    }),
    Session.init(),
  ],
});

const app = express();

app.use(
  cors({
    origin: String(Deno.env.get("AUTH_WEBSITE_DOMAIN")),
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
);

app.use(middleware());

app.get("/", (req, res) => {
  res.send("Welcome to the Dinosaur API!");
});

app.use(errorHandler());
app.listen(80);