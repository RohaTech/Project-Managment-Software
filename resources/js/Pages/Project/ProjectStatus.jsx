import { React, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function ProjectStatus({ project, role }) {
  const [projectStatus, setProjectStatus] = useState(project.status);
  const { data, setData, patch, processing, errors, reset } = useForm({
    status: projectStatus,
  });

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ];

  const StatusIndicator = () => {
    switch (projectStatus) {
      case "Pending":
        return (
          <span className="flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
        );
      case "In Progress":
        return (
          <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full"></span>
        );
      case "Completed":
        return (
          <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("project.status", [project]), {
      onSuccess: () => {
        // window.location.reload();
        setProjectStatus(data.status);
      },
    });
  };

  return (
    <div className="flex items-end gap-x-4 relative">
      <label
        htmlFor="status"
        className="block mb-2 text-sm  text-primary font-bold uppercase "
      >
        Status
      </label>

      {role === "owner" ? (
        <div className="relative">
          <div className=" absolute top-[12.8px] right-7">
            {StatusIndicator()}
          </div>

          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2"
            onChange={(e) => {
              setData("status", e.target.value);
              setProjectStatus(e.target.value);
            }}
            onBlur={handleSubmit}
          >
            {statusOptions.map((status, index) => (
              <option
                id="status"
                key={index}
                value={status.value}
                selected={status.value === projectStatus}
              >
                {status.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <div className="text-red-500 w-[200px] text-xs mt-1  absolute -top-10 ">
              {errors.status}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   w-[120px] p-2">
          {StatusIndicator()}
          {projectStatus}
        </div>
      )}
    </div>
  );
}
