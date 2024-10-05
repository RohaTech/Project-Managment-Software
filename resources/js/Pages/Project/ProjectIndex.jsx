import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React from "react";

export default function Project_Index({ projects, queryParams = null }) {
  queryParams = queryParams || {};
  const handleSearch = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };
  const onKeyPress = (name, e) => {
    if (e.key == "Enter") {
      handleSearch(name, e.target.value);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  console.log(projects);
  return (
    <AuthenticatedLayout>
      <div className="rounded-sm border border-stroke bg-white cursor-pointer  pt-6   shadow-default   px-7 pb-1">
        <div className=" flex gap-x-8 items-center mb-6 ">
          <h4 className="text-3xl uppercase font-semibold text-primary">
            Projects
          </h4>
          <div className="relative">
            <TextInput
              className="py-1"
              defaultValue={queryParams.name}
              onBlur={(e) => handleSearch("name", e.target.value)}
              onKeyPress={(e) => onKeyPress("name", e)}
            />

            <svg
              className="w-4 h-4 text-primary z-20 absolute top-[10px] right-3 "
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
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 p-5 font-semibold text-primary  uppercase  rounded-sm bg-[#f7f9fc]  ">
            <div className=" ml-8 ">
              <h1 className=" ">Name</h1>
            </div>

            <div className="text-center ">
              <h1 className=" ">Created By</h1>
            </div>
            <div className="text-center ">
              <h1 className=" "> Last Update By</h1>
            </div>
            <div className="text-center  ">
              <h1 className=" ">Created At</h1>
            </div>
          </div>
          {projects.map((project, key) => (
            <Link
              key={project.id}
              href={route("project.show", project)}
              className="block "
            >
              <div
                className={`grid grid-cols-4 duration-300 ease-linear hover:bg-gray-100 group  hover:shadow-md ${
                  key === projects.length - 1 ? "" : "border-b border-stroke "
                }`}
                key={key}
              >
                <div className="flex items-center group-hover:text-primaryColor group-hover:font-semibold duration-300 ease-linear  p-2.5 xl:p-5">
                  <h1 className="text-nowrap">{project.name}</h1>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{project.creator.name}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{project.update_by.name}</p>
                </div>

                <div className="flex items-center justify-center  mr-4  p-2.5 xl:p-5">
                  <p className="">{formatDate(project.created_at)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
