import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AdditionalColumnUpdate({ project }) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    title: "",
    type: "",
  });

  const [currentTitle, setCurrentTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("project.additional-column.create", [project]));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Task" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Additional Column Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={data.title}
                  onChange={(e) => {
                    setData("title", e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.title && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.title}
                  </div>
                )}
              </div>

              {/* <div className="mb-4">
                <label
                  htmlFor="project_id"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Project
                </label>
                <input
                  type="text"
                  id="project_id"
                  value={project_id}
                  onChange={(e) => setData("project_id", e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.project_id && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.project_id}
                  </div>
                )}
              </div> */}

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Additional Column Type
                </label>
                <input
                  type="text"
                  id="type"
                  value={data.type}
                  onChange={(e) => setData("type", e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.type && (
                  <div className="text-red-500 text-xs mt-1">{errors.type}</div>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Additional Column
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
