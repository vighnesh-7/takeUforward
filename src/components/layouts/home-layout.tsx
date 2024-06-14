"use client";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import { RxDashboard } from "react-icons/rx";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import { User } from "@/types/user";

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const items = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      path: "/",
    },
  ];
  return (
    <div className="w-full">
      <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
      <div className="flex">
        <Sidebar items={items} menu={menu} setMenu={setMenu} />
        <Suspense fallback={<Loading />}>
          <div
            className={`w-full ${menu ? "sm:pl-48" : "sm:pl-20"}`}
          >
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
