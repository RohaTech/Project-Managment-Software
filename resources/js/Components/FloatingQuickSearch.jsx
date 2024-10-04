import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export const FloatingQuickSearch = () => {
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
      <div
        onClick={open}
        className="fixed z-999999 cursor-pointer bottom-10 right-20 size-13  flex justify-center items-center rounded-full bg-primary "
      >
        <svg
          className="size-7  fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 460 512"
        >
          <path d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z" />
        </svg>
      </div>

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
