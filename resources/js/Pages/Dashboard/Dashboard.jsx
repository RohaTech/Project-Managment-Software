import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import CardDataStats from "./CardDataStats";
import { PieChart } from "./PieChart";
import { BarChart } from "./BarChart";
import clsx from "clsx";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
export default function Dashboard({
  projectsCount,
  taskStats,
  personalTasksStats,
  projects,
}) {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectionError, setSelectionError] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProjects =
    query === ""
      ? projects
      : projects.filter((project) => {
          return project.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (selectionError) {
      setTimeout(() => {
        setSelectionError(false);
      }, 2000);
    }
  }, [selectionError]);

  const removeSelection = (name) => {
    const filteredSelection = selectedProjects.filter(
      (project) => project.name !== name
    );

    setSelectedProjects(filteredSelection);
  };

  return (
    <AuthenticatedLayout>
      <div className="ml-8 mb-3 pb-6 flex items-center gap-x-4 border-b border-b-gray-300">
        <div className="">
          <h1 className="">Select Projects </h1>
        </div>
        <Combobox
          multiple
          value={selectedProjects}
          onChange={(projects) => {
            if (projects.length <= 3) {
              setSelectedProjects(projects);
            } else {
              setSelectionError(true);
            }
          }}
          onClose={() => setQuery("")}
        >
          <div className="relative">
            {selectionError && (
              <div className="text-red-500 -top-6 -left-3 text-nowrap absolute text-sm mb-2">
                You can only select up to 3 projects.
              </div>
            )}
            <ComboboxInput
              className={clsx(
                "w-full rounded-lg border-gray-300 bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 ",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
              displayValue={(person) => person?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <div className="flex-col flex">
                <svg
                  className="fill-primaryColor size-2.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                </svg>
                <svg
                  className="fill-primaryColor size-2.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </div>
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom"
            className={clsx(
              " rounded-xl border border-gray-200 p-3 bg-white min-w-[288px] cursor-pointer  empty:invisible",
              "transition duration-100 ease-in divide-y mt-2 data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {filteredProjects.map((project) => (
              <ComboboxOption
                key={project.id}
                value={project}
                className={`data-[focus]:bg-blue-100 p-0.5 data-[selected]:bg-primary data-[selected]:text-white `}
              >
                {project.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
        {selectedProjects.length > 0 && (
          <div className="flex gap-x-2">
            <ul className="flex flex-wrap gap-x-2 gap-y-2 cursor-pointer">
              {selectedProjects.map((project) => (
                <li
                  onClick={() => {
                    removeSelection(project.name);
                  }}
                  className="bg-gray-200 p-2 justify-center items-center flex rounded"
                  key={project.id}
                >
                  {project.name}
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedProjects([])} className="p-3">
              X
            </button>
          </div>
        )}
      </div>
      <div className="grid pb-16  cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Projects" total={`${projectsCount}`}>
          <svg
            className="size-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0,0,256,256"
          >
            <g
              fill="#1868db"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
            >
              <g transform="scale(3.2,3.2)">
                <path d="M14,10c-4.40644,0 -8,3.59356 -8,8v38c0,4.40644 3.59356,8 8,8h2.26367c0.89296,3.44238 4.0212,6 7.73633,6h51v-46h-6v-6h-47c0,-4.40644 -3.59356,-8 -8,-8zM14,12c3.32556,0 6,2.67444 6,6v32.72852c-1.46795,-1.66819 -3.61203,-2.72852 -6,-2.72852c-2.38797,0 -4.53205,1.06033 -6,2.72852v-32.72852c0,-3.32556 2.67444,-6 6,-6zM12,15c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,19c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM22,20h45v42h-53c-3.32556,0 -6,-2.67444 -6,-6c0,-3.32556 2.67444,-6 6,-6c3.32556,0 6,2.67444 6,6h2zM62.94141,22c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,23c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM62.94141,26c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM69,26h4v42h-49c-2.62252,0 -4.83388,-1.66589 -5.6543,-4h50.6543zM12,27c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM47,27v2h5.58594l-7.58594,7.58594l-7,-7l-9.70703,9.70703l1.41406,1.41406l8.29297,-8.29297l7,7l9,-9v5.58594h2v-9zM62.94141,30c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,31c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM62.94141,34c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,35c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM62.94141,38c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,39c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM62.94141,42c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,43c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM28,46v2h28v-2zM62.94141,46c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM62.94141,50c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM28,52v2h20v-2zM62.94141,54c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM62.94141,58c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1z"></path>
              </g>
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Task" total={taskStats.taskCount}>
          <svg
            className="size-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0,0,256,256"
          >
            <g
              fill="#1868db"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
            >
              <g transform="scale(8.53333,8.53333)">
                <path d="M6.98047,3.98828c-0.32962,0.00908 -0.63357,0.18006 -0.8125,0.45703l-1.32422,1.98438l-0.13672,-0.13672c-0.25082,-0.26123 -0.62327,-0.36647 -0.9737,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01387,0.72289 0.27511,0.9737l1,1c0.21185,0.21178 0.50748,0.31745 0.80557,0.28794c0.2981,-0.02951 0.56727,-0.19108 0.73349,-0.44028l2,-3c0.21326,-0.31011 0.23436,-0.7137 0.0546,-1.04436c-0.17976,-0.33066 -0.52994,-0.5324 -0.90616,-0.52205zM12,6c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h14c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587zM6.98047,11.98828c-0.32962,0.00908 -0.63357,0.18006 -0.8125,0.45703l-1.32422,1.98438l-0.13672,-0.13672c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l1,1c0.21185,0.21178 0.50748,0.31745 0.80557,0.28794c0.2981,-0.02951 0.56727,-0.19108 0.73349,-0.44028l2,-3c0.21326,-0.31011 0.23436,-0.7137 0.0546,-1.04436c-0.17976,-0.33066 -0.52994,-0.5324 -0.90616,-0.52205zM12,14c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h14c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587zM6,20c-1.64501,0 -3,1.35499 -3,3c0,1.64501 1.35499,3 3,3c1.64501,0 3,-1.35499 3,-3c0,-1.64501 -1.35499,-3 -3,-3zM6,22c0.56413,0 1,0.43587 1,1c0,0.56413 -0.43587,1 -1,1c-0.56413,0 -1,-0.43587 -1,-1c0,-0.56413 0.43587,-1 1,-1zM12,22c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h14c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587z"></path>
              </g>
            </g>
          </svg>
        </CardDataStats>
        <CardDataStats title="Completed Task" total={taskStats.taskCompleted}>
          <svg
            className="size-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            id="completed"
          >
            <path
              d="M28.75,55.5a23.5,23.5,0,1,1,14-42.38,2,2,0,0,1-2.38,3.21A19.51,19.51,0,1,0,48.25,32,19.65,19.65,0,0,0,48,28.93a2,2,0,1,1,4-.62A23.85,23.85,0,0,1,52.25,32,23.52,23.52,0,0,1,28.75,55.5Z"
              fill="#3c50e0"
              className="color000000 svgShape"
            ></path>
            <path
              d="M31.25,39.5a2,2,0,0,1-1.41-.59l-9.5-9.5a2,2,0,0,1,2.82-2.82l8.09,8.08L55.34,10.59a2,2,0,0,1,2.82,2.82l-25.5,25.5A2,2,0,0,1,31.25,39.5Z"
              fill="#3c50e0"
              className="color000000 svgShape"
            ></path>
          </svg>
        </CardDataStats>
        <CardDataStats
          title="In-Progress Task"
          total={taskStats.taskInprogress}
        >
          <svg
            className="size-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="Loading"
          >
            <path
              d="M12 7c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm0 16c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm10-10h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1zM6 13H2c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1zm13.07 7.07c-.26 0-.51-.1-.71-.29l-2.83-2.83a.996.996 0 1 1 1.41-1.41l2.83 2.83a.996.996 0 0 1-.71 1.7zM7.76 8.76c-.26 0-.51-.1-.71-.29L4.22 5.64a.996.996 0 1 1 1.41-1.41l2.83 2.83a.996.996 0 0 1-.71 1.7zM4.93 20.07c-.26 0-.51-.1-.71-.29a.996.996 0 0 1 0-1.41l2.83-2.83a.996.996 0 1 1 1.41 1.41l-2.83 2.83c-.2.2-.45.29-.71.29zM16.24 8.76c-.26 0-.51-.1-.71-.29a.996.996 0 0 1 0-1.41l2.83-2.83a.996.996 0 1 1 1.41 1.41l-2.83 2.83c-.2.2-.45.29-.71.29z"
              fill="#3c50e0"
              className="color000000 svgShape"
            ></path>
          </svg>
        </CardDataStats>
        <div className="mt-4 cursor-pointer w-full flex grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <PieChart taskStats={taskStats} />
          <BarChart personalTasksStats={personalTasksStats} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
