import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function ProjectShow({ project, tasks, user }) {
  console.log(tasks);
  //   console.log(project);

  const mappedTasks = tasks.map((task) => (
    <div key={task.id}>
      <h2 className="">{task.name}</h2>
    </div>
  ));

  return (
    <AuthenticatedLayout>
      <div className="">
        <h1 className="">{project.name}</h1>
      </div>
    </AuthenticatedLayout>
  );
}
