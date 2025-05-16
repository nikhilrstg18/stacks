import * as React from "react";
import NavBar from "../components/nav.component";
import Aside from "../components/aside.component";
import Tray from "../components/tray.component";

export default function Notebook({ children, sideMenu, stack }) {
  return (
    <div className="site-container">
      <NavBar section={stack}></NavBar>
      <div className="notebook-content">
        <Aside sideMenu={sideMenu}></Aside>
        <main>{children}</main>
      </div>
      <Tray sideMenu={sideMenu}></Tray>
    </div>
  );
}
