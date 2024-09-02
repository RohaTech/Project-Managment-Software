import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React from "react";

export default function Project_Index({ projects }) {
  console.log(projects);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <AuthenticatedLayout>
      <div className="rounded-sm border border-stroke bg-white cursor-pointer  pt-6   shadow-default   px-7 pb-1">
        <h4 className="mb-6 text-xl font-semibold text-primary">Projects</h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 p-5 font-semibold text-primary  uppercase  rounded-sm bg-[#f7f9fc] ">
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
              href={route("project.show", project.id)}
              className="block"
            >
              <div
                className={`grid grid-cols-4 hover:bg-gray-200 group  ${
                  key === projects.length - 1 ? "" : "border-b border-stroke "
                }`}
                key={key}
              >
                <div className="flex items-center group-hover:text-primaryColor group-hover:font-bold  p-2.5 xl:p-5">
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
