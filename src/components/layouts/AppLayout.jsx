import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10 font-bold text-2xl">
        Hirez crafted with passion to find your dream job👍
      </div>
    </div>
  );
};

export default AppLayout;
