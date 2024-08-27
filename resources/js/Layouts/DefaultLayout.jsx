import Sidebar from "@/Components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
export default function DefaultLayout({ children }) {
  return (
    <div className="dark:bg-boxdark-2 ">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden  ">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex  flex-1 flex-col overflow-y-auto overflow-x-hidden ">
          {/* <!-- ===== Main Content Start ===== --> */}
          <div>
            <div className="mx-auto p-4 md:p-6 ml-72.5 2xl:p-10 overscroll-contain overflow-y-auto">
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
