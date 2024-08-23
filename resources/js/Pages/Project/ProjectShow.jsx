import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function ProjectShow({ project, tasks, user }) {
  console.log(tasks);
  //   console.log(project);

  return (
    <AuthenticatedLayout user={user}>
      <div className="">
        <h1 className="">SHOW</h1>
      </div>
    </AuthenticatedLayout>
  );
}
