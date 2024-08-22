import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";

export default function Home({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    return (
    <AuthenticatedLayout
      user={user}
    >
      <div className="w-full flex flex-col gap-y-4">
        <div className="">
            <div className="px-4 shadow-lg mb-4">
                <div className="flex justify-between items-center ">
                    <div className="flex gap-x-4">
                        <div>
                            <h2 className="font-thin text-sm text-gray-700">Good afternoon, {user.name}!</h2>
                            <h3 className="text-gray-700 font-bold">Quick access your recent boards, inboxes and workspaces</h3>
                        </div>
                        <div className="h-16"><img src="/image/homePageImage/header-background-v2.svg" alt="" className="h-full"/></div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="text-gray-800 flex gap-x-2 items-center px-2 cursor-pointer"><svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1f2937" d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>Give feedback</div>
                        <div className="text-white flex gap-x-2 items-center bg-[#0060b9eb] px-4 py-2 rounded-lg cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 448 512"><path fill="#ffffff" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/></svg>Qick Search</div>
                    </div>
                </div>
            </div>
            <div class="flex px-4 ">
                    <div class="w-2/3">
                        <ul>
                            <li className="flex gap-x-1 items-center font-bold text-[#323338]"><span className="cursor-pointer" onClick={handleOpen}>{!isOpen ? <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#323338" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 " viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>}</span>Recently Created</li>
                            {isOpen && <div>
                                    <div>
                                        <img src="" alt="" />
                                    </div>
                                </div>}
                        </ul>

                    </div>
                    <div class="w-1/3">35% width</div>
            </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
