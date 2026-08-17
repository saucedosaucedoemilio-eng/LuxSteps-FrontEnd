import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
