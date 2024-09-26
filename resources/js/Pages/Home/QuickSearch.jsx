import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export const QuickSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8001/home/all-search?query=${searchQuery}`,
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

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const mappedProjects =
    fetchedData &&
    fetchedData.projects.map((project) => (
      <Link href={route("project.show", project.id)} className=" block">
        <li
          key={project.id}
          className=" p-2 border border-gray-300 rounded-lg hover:bg-primary/50 cursor-pointer "
        >
          {project.name}
        </li>
      </Link>
    ));
  const mappedTasks =
    fetchedData &&
    fetchedData.tasks.map((task) => (
      <Link href={route("task.show", task.id)} className=" block">
        <li
          key={task.id}
          className=" p-2  border border-gray-300 rounded-lg hover:bg-primary/50 cursor-pointer"
        >
          {task.name}
        </li>
      </Link>
    ));
  const mappedSubtasks =
    fetchedData &&
    fetchedData.subtasks.map((subtask) => (
      <Link href={route("subtask.show", subtask.id)} className=" block">
        <li
          key={subtask.id}
          className=" p-2  border border-gray-300 rounded-lg hover:bg-primary/50 cursor-pointer"
        >
          {subtask.name}
        </li>
      </Link>
    ));
  return (
    <div className="">
      <button
        onClick={open}
        className="text-white flex  gap-x-2 items-center bg-[#0060b9eb] hover:bg-[#779cbeeb] transition duration-300 ease-in-out px-4 py-2 rounded-lg cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4"
          viewBox="0 0 448 512"
        >
          <path
            fill="#ffffff"
            d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"
          />
        </svg>
        Quick Search
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none  "
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10  overflow-y-auto overscroll-contain">
          <div className="flex min-h-full bg-yellow-00 items-center justify-end p-4">
            <DialogPanel
              transition
              className="w-[1100px] absolute top-10 mt-16 mr-16 min-h-[500px] backdrop-blur-2xl  rounded-xl  bg-white   border border-gray  shadow-2xl  p-6   duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-3xl font-semibold py-3  text-primary"
              >
                Quick Search
              </DialogTitle>

              <div
                onClick={close}
                className="absolute  cursor-pointer top-5 right-10"
              >
                <svg
                  className="size-8 fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
              </div>

              <div className="relative lg:mt-[15px] flex items-center rounded-full border border-black bg-green-300 w-[800px] mx-auto shadow-sm">
                <input
                  className="text-x  block w-[90vw] rounded-full   border-none  px-[38px]    placeholder:text-lg placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 py-[15px] "
                  placeholder="Search for anything: projects, tasks, subtasks ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  name="search"
                />
                <svg
                  className="absolute right-[35px] top-[20px] size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>

              <div className="mt-8 ">
                <div className="flex gap-x-16">
                  <h1 className="text-xl text-primary font-bold">
                    Search Results
                  </h1>

                  <div className="flex gap-x-2"></div>
                </div>
                <div className="mt-4  flex flex-col gap-y-1 border-t border-primary  p-2">
                  <div className=" py-2">
                    <h1 className="font-bold  text-primary">Projects</h1>
                    <ul className="space-y-2 mt-4">
                      {mappedProjects && mappedProjects.length > 0 ? (
                        mappedProjects
                      ) : (
                        <h1 className="uppercase text-red-500">
                          NO Projects Found
                        </h1>
                      )}
                    </ul>
                  </div>
                  <div className=" py-2">
                    <h1 className="font-bold  text-primary">Task</h1>
                    <ul className="space-y-2">
                      {mappedTasks && mappedTasks.length > 0 ? (
                        mappedTasks
                      ) : (
                        <h1 className="uppercase    text-red-500">
                          NO Tasks Found
                        </h1>
                      )}
                    </ul>
                  </div>
                  <div className=" py-2">
                    <h1 className="font-bold  text-primary">Sub-Tasks</h1>
                    <ul className="space-y-2">
                      {mappedSubtasks && mappedSubtasks.length > 0 ? (
                        mappedSubtasks
                      ) : (
                        <h1 className="uppercase    text-red-500">
                          NO Subtasks Found
                        </h1>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
