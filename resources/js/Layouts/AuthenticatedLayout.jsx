import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import DropdownUser from "@/Components/DropdownUser";
import DefaultLayout from "./DefaultLayout";

export default function AuthenticatedLayout({ header, children, projects }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [isSideBar, setIsSideBar] = useState(true);

  let asideProjects;
  if (projects) {
    asideProjects = projects;
    console.log(asideProjects);
  }

  return (
    <div className=" h-screen relative overflow-x-hidden overflow-y-hidden ">
      <header className="w-full mb-0.5 sticky top-0 left-0 z-[10000] bg-white">
        <nav className="bg-white border-gray-200 py-4 shadow-md   w-full">
          <div className="flex flex-wrap items-center justify-between w-full  px-16 mx-auto">
            <div href="#" className="flex items-center">
              <ApplicationLogo />
            </div>
            <div className="flex items-center lg:order-2">
              <DropdownUser />

              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    href={route("home")}
                    className="block py-2 pl-3 pr-4     rounded lg:bg-transparent  lg:p-0 "
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0  "
                  >
                    Templates
                  </a>
                </li> */}
                <li>
                  <Link
                    href={route("contact")}
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0  "
                  >
                    Contact us
                  </Link>
                </li>

                <li>
                  <Link
                    href={route("AboutUs")}
                    className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0  "
                  >
                    About us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <DefaultLayout
          asideProjects={asideProjects}
          isSideBar={isSideBar}
          setIsSideBar={setIsSideBar}
        >
          {children}
        </DefaultLayout>
      </main>
    </div>
  );
}
