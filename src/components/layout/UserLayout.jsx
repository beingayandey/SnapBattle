import { Outlet } from "react-router-dom";
import Navbar from "../user/Navbar";
import Footer from "../user/Footer"; // optional

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
