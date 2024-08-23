import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React from "react";

export default function Project_Index({ projects, user }) {
  const { delete: destroy } = useForm();

  const submit = (project_id) => {
    destroy(route("project.delete", project_id));
  };

  const mappedProjects = projects.map((project) => (
    <div
      key={project.id}
      className="flex items-center py-2 border-y border-gray-300 justify-between"
    >
      <div className="min-w-0 flex gap-x-4">
        <h2 className=" ">{project.creator.name}</h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <Link href={route("project.show", project.id)}>
            <div className=" hover:text-primaryColor cursor-pointer mt-2 flex w-[250px] items-center text-sm  text-primary-600  font-bold">
              {project.name}
            </div>
          </Link>
          <div className="mt-2 flex text-right items-center text-sm text-primary-600 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
            </svg>
            {project.description ? project.description : "NO Description"}
          </div>
          <div className="">
            <h2 className=" ">{project.update_by.name}</h2>
          </div>
        </div>
      </div>
      <div className="flex ml-4 mt-0 space-x-3">
        <Link href={route("project.edit", [project.id])}>
          <span className="block">
            <button className="inline-flex hover:scale-105 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <div className="flex">
                <svg
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                Edit
              </div>
            </button>
          </span>
        </Link>

        <button
          onClick={() => {
            submit(project.id);
          }}
          className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:scale-105"
        >
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-ml-0.5 mr-1.5 h-5 w-5 "
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
            Delete
          </div>
        </button>
      </div>
    </div>
  ));
  return (
    <AuthenticatedLayout user={user}>
      <div className=" container max-w-[1200px] mx-auto ">
        <div className="py-3 px-3">
          <div className="space-y-4px-4  ">{mappedProjects}</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
