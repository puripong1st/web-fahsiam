// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
