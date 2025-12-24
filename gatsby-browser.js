import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./src/styles/prism-dracula.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

// Prevent FontAwesome from adding its CSS automatically
config.autoAddCss = false;

export const wrapRootElement = ({ element }) => {
  console.log(process.env);
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      authorizationParams={{
        redirect_uri: window.location.href,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {element}
    </Auth0Provider>
  );
};
