import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
