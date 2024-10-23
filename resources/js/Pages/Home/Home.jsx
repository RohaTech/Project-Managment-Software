import ApplicationLogo from "@/Components/ApplicationLogo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import ActivityIcon from "./ActivityIcon";
import ProjectIcon from "./ProjectIcon";
import RightSide from "./RightSide";
import { QuickSearch } from "./QuickSearch";

export default function Home({ user, projects, activities }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isUpdateFeed, setIsUpdateFeed] = useState(true);
  const [isFavourite, setIsFavourite] = useState({});
  const [greeting, setGreeting] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return "Good Morning";
      } else if (currentHour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    const formatDate = () => {
      const date = new Date();
      const options = { weekday: "long", month: "long", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    setGreeting(getGreeting());
    setFormattedDate(formatDate());
  }, []);

  const handleUpdateFeed = () => {
    setIsUpdateFeed(!isUpdateFeed);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleFavourite = (index) => {
    setIsFavourite((prevFavorites) => ({
      ...prevFavorites,
      [index]: !prevFavorites[index],
    }));
  };

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <AuthenticatedLayout user={user}>
      <div className="w-full flex flex-col gap-y-4">
        <div className="">
          <div className="p-4 shadow-xl mb-4 rounded-lg">
            <div className="flex justify-between items-center ">
              <div className="flex flex-col  ">
                <div>{formattedDate}</div>
                <div className="text-2xl ">
                  {greeting}, {user.name}
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="text-gray-800 flex gap-x-2 items-center px-2 cursor-pointer">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#1f2937"
                      d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                    />
                  </svg>
                  Give feedback
                </div>
                <QuickSearch />
              </div>
            </div>
          </div>

          <div className="flex px-4 gap-x-3 justify-between">
            <div className="w-2/3 shadow-lg px-5">
              <ul>
                <li className="flex gap-x-1 items-center font-bold text-[#323338] py-4 2">
                  <span className="cursor-pointer" onClick={handleOpen}>
                    {!isOpen ? (
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path
                          fill="#323338"
                          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 "
                        viewBox="0 0 512 512"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    )}
                  </span>
                  Recently Created
                </li>
                <div
                  className={` ${
                    projects.length === 0
                      ? "flex justify-center"
                      : "grid grid-cols-2 gap-4 px-2 pb-2"
                  }`}
                >
                  {isOpen &&
                    (projects.length > 0 ? (
                      projects.slice(0, 4).map((project, index) => (
                        <div
                          key={index}
                          className="p-4 border-2 rounded-md border-gray ml-6"
                        >
                          <div className="w-full">
                            <img
                              className="w-full rounded-md"
                              src="/image/homePageImage/image.png"
                              alt=""
                            />
                          </div>
                          <div className="flex justify-between items-center my-2">
                            <div className="flex items-center gap-x-2">
                              <div className="w-4">{ProjectIcon[index]}</div>
                              <Link
                                href={route("project.show", project.id)}
                                className="font-bold text-md truncate w-[18ch] hover:text-primaryColor transition duration-300 ease-in-out "
                              >
                                {project.name}
                              </Link>
                            </div>
                            <div
                              onClick={() => handleFavourite(index)}
                              className="w-6 cursor-pointer hover:bg-[#e4e4de] rounded-sm p-1 transition duration-300 ease-in-out"
                            >
                              {isFavourite[index] ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                >
                                  <path
                                    fill="#FFD43B"
                                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                >
                                  <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-graydark text-xs">
                              Work management &gt; Main Workspace
                            </h3>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center w-full">
                        <div className="flex flex-col justify-center w-1/2">
                          <h3 className="text-2xl text-blue-500 font-bold text-center">
                            No projects Available
                          </h3>
                        </div>
                        <div className="ml-10 rounded-xl flex flex-col">
                          <Link
                            href={route("project.create")}
                            className="flex   px-4 py-2  gap-x-2  items-center justify-center border-2 rounded-xl bg-primary hover:scale-105 transition duration-400 ease-in-out"
                          >
                            <span className="text-lg rounded-lg text-white">
                              New Project
                            </span>

                            <svg
                              className="size-5 fill-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                            >
                              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  {projects.length > 4 && isOpen && (
                    <div className="col-span-2 ml-auto">
                      <Link
                        href={route("project.index")}
                        className="text-blue-500 text-[13px] hover:underline flex items-center hover:scale-105 transition duration-300 ease-in-out"
                      >
                        Show All Projects
                        <svg
                          width="20px"
                          height="10px"
                          viewBox="0 -6.5 38 38"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          fill="#5e5c64"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <title>right-arrow</title>{" "}
                            <desc>Created with Sketch.</desc>{" "}
                            <g
                              id="icons"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              {" "}
                              <g
                                id="ui-gambling-website-lined-icnos-casinoshunter"
                                transform="translate(-1511.000000, -158.000000)"
                                fill="#0011ff"
                                fillRule="nonzero"
                              >
                                {" "}
                                <g
                                  id="1"
                                  transform="translate(1350.000000, 120.000000)"
                                >
                                  {" "}
                                  <path
                                    d="M187.812138,38.5802109 L198.325224,49.0042713 L198.41312,49.0858421 C198.764883,49.4346574 198.96954,49.8946897 199,50.4382227 L198.998248,50.6209428 C198.97273,51.0514917 198.80819,51.4628128 198.48394,51.8313977 L198.36126,51.9580208 L187.812138,62.4197891 C187.031988,63.1934036 185.770571,63.1934036 184.990421,62.4197891 C184.205605,61.6415481 184.205605,60.3762573 184.990358,59.5980789 L192.274264,52.3739093 L162.99947,52.3746291 C161.897068,52.3746291 161,51.4850764 161,50.3835318 C161,49.2819872 161.897068,48.3924345 162.999445,48.3924345 L192.039203,48.3917152 L184.990421,41.4019837 C184.205605,40.6237427 184.205605,39.3584519 184.990421,38.5802109 C185.770571,37.8065964 187.031988,37.8065964 187.812138,38.5802109 Z"
                                    id="right-arrow"
                                  >
                                    {" "}
                                  </path>{" "}
                                </g>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
                <li
                  className={`flex gap-x-1 items-center font-bold text-[#323338] py-2 ${
                    !isUpdateFeed ? "pb-40" : ""
                  }`}
                >
                  <span
                    className="cursor-pointer transition duration-300 ease-in-out "
                    onClick={handleUpdateFeed}
                  >
                    {!isUpdateFeed ? (
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path
                          fill="#323338"
                          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 "
                        viewBox="0 0 512 512"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    )}
                  </span>
                  Update Feed (inbox){" "}
                  <span className="bg-blue-500 rounded-full px-[5px] text-white">
                    {activities.length}
                  </span>
                </li>
                {isUpdateFeed && (
                  <div className="h-[400px] overflow-scroll">
                    {activities.length > 0 ? (
                      activities.map((activity, index) => (
                        <div
                          key={index}
                          className="ml-8 flex items-start gap-x-2 shadow-zinc-400 py-1"
                        >
                          <div className="flex-shrink-0 bg-slate-200 p-[6px] rounded-full">
                            {
                              ActivityIcon[
                                Math.floor(Math.random() * ActivityIcon.length)
                              ]
                            }
                          </div>
                          <div className="flex flex-col">
                            <div className="font-bold">
                              {activity.user} {activity.activity}
                            </div>
                            <div className="text-xs font-light text-gray-500">
                              {formatDate(activity.created_at)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="ml-8 flex items-start gap-x-2 shadow-zinc-400 py-1 border-b-4">
                        <img
                          src="/image/mega-creator(2).png"
                          className="w-[70%]"
                        />
                      </div>
                    )}
                  </div>
                )}
              </ul>
            </div>
            <div className="w-[320px]  p-2 h-screen">
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
