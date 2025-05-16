import * as React from "react";
import NavBar from "../components/nav.component";
import '../styles/global.css'
const Site = ({ children }) => {
  return (
    <div>
      <NavBar></NavBar>
      <main>{children}</main>
    </div>
  );
};
export default Site;
