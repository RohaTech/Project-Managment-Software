import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function ProjectShow({ project, tasks }) {
  console.log(tasks);
  //   console.log(project);

  return (
    <AuthenticatedLayout>
      <div className="">
        <h1 className="">{project.name}</h1>
      </div>
    </AuthenticatedLayout>
  );
}
