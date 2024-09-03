import React, { useEffect, useRef, useState } from "react";
import ApplicationLogo from "../ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
const Sidebar = () => {
  const [isSideBar, setIsSideBar] = useState(true);
  const [fetchedData, setFetchedData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { projects } = usePage().props;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8001/project-search?query=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          console.log("Network Error");
        }

        const data = await response.json();

        setFetchedData(data);
      } catch (error) {
        console.error("Error In Fetching Operation", error);
      }
    };

    if (searchQuery) {
      fetchProjects();
    }
  }, [searchQuery]);

  //   useEffect(() => {
  //     console.log(fetchedData);
  //   }, [fetchedData]);

  const { pathname } = window.location;
  const sidebar = useRef(null);
  useEffect(() => {
    const sidebarElement = sidebar.current;
    sidebarElement.addEventListener("wheel", (e) => {
      e.preventDefault();
    });

    // Clean up event listener on unmount
    return () => {
      sidebarElement.removeEventListener("wheel", (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const mappedAsideProjects = projects.slice(0, 5).map((project) => (
    <Link href={route("project.show", project.id)} key={project.id}>
      <li className="px-1 py-2 hover:text-primary hover:font-bold">
        <h1 className="text-sm  capitalize">{project.name}</h1>
      </li>
    </Link>
  ));
  const mappedProjects =
    fetchedData &&
    fetchedData.projects.map((project) => (
      <Link href={route("project.show", project.id)} className=" block">
        <li
          className="border border-gray-300 rounded-md p-2 hover:bg-primary/50 cursor-pointer"
          key={project.id}
        >
          {project.name}
        </li>
      </Link>
    ));

  return (
    <aside
      ref={sidebar}
      className={`z-[50]    left-0 h-full   w-72.5 flex-col overflow-hidden bg-[#f7f8f9] duration-300 ease-linear ${
        !isSideBar ? "hidden" : "flex fixed"
      }   `}
    >
      <div className="no-scrollbar  flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="  py-4  mt-5  ">
          {/* <!-- Menu Group --> */}
          <div>
            <div className="  mb-3 px-6   items-center justify-between flex">
              <h3 className=" text-xl font-semibold text-primaryColor ">
                MENU
              </h3>
              <div className="">
                {/* back button */}
                {/* <svg
                  className="size-5 fill-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg> */}
              </div>
            </div>

            <div className="space-y-2">
              <Link href={route("home")}>
                <div className="flex items-center hover:text-primaryColor  px-6 text gap-x-2 cursor-pointer ">
                  <svg
                    className="size-4 fill-primaryColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                  <h1 className="">Home</h1>
                </div>
              </Link>
              <Link
                href={route("project.create")}
                className="flex  items-center px-6 text gap-x-2 cursor-pointer hover:text-primaryColor  "
              >
                <svg
                  className="size-4 fill-primaryColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
                <h1 className="">Create Project</h1>
              </Link>
            </div>
            <form className="max-w-md mx-auto mb-3 mt-5 px-6">
              <label
                htmlFor="default-search"
                className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center  pointer-events-none"></div>
                <input
                  type="search"
                  id="default-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg group bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Search "
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-1.5  backdrop:focus:ring-4  font-medium rounded-lg text-sm px-4 py-2  "
                >
                  <svg
                    className="w-4 h-4 text-primary group-hover:hidden  "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <ul className="flex flex-col px-8 text-sm gap-y-2">
              {mappedProjects && mappedProjects.length > 0 ? (
                mappedProjects
              ) : (
                <h1 className=" hidden">NO Projects Found</h1>
              )}
            </ul>

            <ul className="mb-6 mt-2 pt-2  border-t  border-graydark  flex flex-col gap-1.5">
              {/* <!-- Menu Item Project --> */}
              <div>
                <Link href={route("project.index")}>
                  <div
                    className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-black duration-300 ease-in-out hover:bg-primary hover:text-white px-6  `}
                  >
                    <svg
                      className="fill-black"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                        fill=""
                      />
                      <path
                        d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                        fill=""
                      />
                      <path
                        d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                        fill=""
                      />
                      <path
                        d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                        fill=""
                      />
                    </svg>
                    Projects
                  </div>
                </Link>

                {/* <!-- Dropdown Menu Start --> */}
                <div className={`translate transform overflow-hidden`}>
                  <ul className="mt-4 ml-4 mb-5.5 flex flex-col gap-1 pl-6">
                    {mappedAsideProjects}
                  </ul>
                </div>
                {/* <!-- Dropdown Menu End --> */}
              </div>

              {/* <!-- Menu Item Project --> */}

              {/* <!-- Menu Item Dashboard --> */}

              <Link
                href={route("dashboard")}
                className={`group relative flex items-center gap-2.5 rounded-sm  py-2 font-medium text-black duration-300 ease-in-out hover:bg-primary hover:text-white px-6  `}
              >
                <svg
                  className="fill-black"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_130_9801)">
                    <path
                      d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                      fill=""
                    />
                    <path
                      d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_130_9801">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0 0.052124)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Dashboard
              </Link>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
