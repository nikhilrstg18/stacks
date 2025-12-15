import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as styles from "../styles/auth.module.css";

function Auth() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.family_name !== "Rustagi") {
        logout({ returnTo: window.location.origin });
      }
    }
  }, [isLoading, isAuthenticated, user, logout]);

  if (isLoading) {
    return <div className="styles.loader">🌀</div>;
  }

  if (!isAuthenticated) {
    return (
      <button
        onClick={loginWithRedirect}
        title="Log In"
        className={styles.authAction}
      >
        ➡️
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        logout({ returnTo: window.location.origin });
      }}
      title="Logout"
      className={styles.authAction}
    >
      Hi {user.given_name}
    </button>
  );
}

export default Auth;
