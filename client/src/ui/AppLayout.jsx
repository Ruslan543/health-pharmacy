import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="container">
      <header className="header">
        <Navigation />
      </header>

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
