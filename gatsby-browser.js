// require("prismjs/themes/prism.min.css");
import "./src/styles/prism-dracula.css";

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const wrapRootElement = ({ element }) => {
  console.log(process.env);
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENTID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {element}
    </Auth0Provider>
  );
};
