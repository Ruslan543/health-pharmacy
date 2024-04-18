import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function AccountLayout() {
  return (
    <div className="container">
      <header className="header">
        <Navigation />
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default AccountLayout;
