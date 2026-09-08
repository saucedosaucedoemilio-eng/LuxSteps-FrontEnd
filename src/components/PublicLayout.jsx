import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <div id="top" className="relative flex min-h-screen flex-col">
      {/* Fondo compartido en todas las pantallas */}
      <div className="fixed inset-0 z-0 bg-ink-950">
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-ink-950/70" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default PublicLayout;
