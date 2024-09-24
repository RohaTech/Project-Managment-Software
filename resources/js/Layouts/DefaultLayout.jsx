import Sidebar from "@/Components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
export default function DefaultLayout({ children, setIsSideBar, isSideBar }) {
  return (
    <div className="dark:bg-boxdark-2 ">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden  ">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar isSideBar={isSideBar} setIsSideBar={setIsSideBar} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex  flex-1 flex-col overflow-y-auto overflow-x-hidden ">
          {/* <!-- ===== Main Content Start ===== --> */}
          <div>
            <div
              className={`mx-auto p-1 md:p-1 duration-700 ease-linear  2xl:p-10 overscroll-contain overflow-y-auto ${
                isSideBar ? "translate-x-72.5" : "translate-x-[30px] "
              }`}
            >
              {children}
            </div>
          </div>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
}
