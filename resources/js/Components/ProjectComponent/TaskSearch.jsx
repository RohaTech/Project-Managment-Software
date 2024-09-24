import React, { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function TaskSearch({ project }) {
  const [fetchedData, setFetchedData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8001/task-search?query=${searchQuery}`,
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
      fetchTasks();
    }
  }, [searchQuery]);

  const mappedTasks =
    fetchedData &&
    fetchedData.tasks.map((task, index) => (
      <Link key={index} href={route("task.show", task.id)} className=" block">
        <li
          className="border border-gray-300 rounded-md p-2 hover:bg-primary/50 cursor-pointer"
          key={project.id}
        >
          {task.name}
        </li>
      </Link>
    ));

  useEffect(() => {
    if (mappedTasks) {
      console.log(mappedTasks.length);
    }
  }, [fetchedData]);
  //   const mappedTasks = (
  //     <>
  //       <li className="border border-gray-300 rounded-md p-2 hover:bg-primary/50 cursor-pointer">
  //         Task 1
  //       </li>
  //       <li className="border border-gray-300 rounded-md p-2 hover:bg-primary/50 cursor-pointer">
  //         Task 1
  //       </li>
  //       <li className="border border-gray-300 rounded-md p-2 hover:bg-primary/50 cursor-pointer">
  //         Task 1
  //       </li>
  //       <li className="border border-gray-300 rounded-md p-2 hover:bg-primary/50 cursor-pointer">
  //         Task 1
  //       </li>
  //       <li className="border border-gray-300 rounded-md p-2 hover:bg-primary/50 cursor-pointer">
  //         Task 1
  //       </li>
  //     </>
  //   );
  return (
    <div className="z-50">
      <form className="max-w-[120px]">
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
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 px-3 py-1"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-[6px]  backdrop:focus:ring-4  font-medium rounded-lg text-sm px-2"
          >
            <svg
              className="w-4 h-4 text-primary"
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
      <ul
        className={`flex flex-col p-8 text-sm gap-y-2 absolute w-[800px]  mt-2 -translate-x-16 bg-gray-100  ${
          isFocused ? "" : "hidden"
        } `}
      >
        {mappedTasks && mappedTasks.length > 0 ? (
          mappedTasks
        ) : (
          <h1 className="   text-red-500">NO Tasks Found</h1>
        )}
      </ul>
    </div>
  );
}
