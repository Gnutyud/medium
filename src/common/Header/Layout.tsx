import React from "react";
import MainNavigation from "./MainNavigation";
const Layout = (props: any) => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main style={{ padding: "0 50px" }}>{props.children}</main>
    </React.Fragment>
  );
};
export default Layout;
