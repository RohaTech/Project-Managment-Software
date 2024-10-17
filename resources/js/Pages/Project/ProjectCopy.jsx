import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ProjectCopyDialog from "@/Components/ProjectComponent/ProjectCopyDialog";

export default function ProjectCopy() {
  const { projects } = usePage().props;
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [currentProject, setCurrentProjectT] = useState();

  const mappedProjects = projects.map((project, index) => (
    <div
      onClick={() => {
        setIsCopyOpen(true);
        setCurrentProjectT(project);
      }}
      key={index}
      className="relative justify-center mt-8 cursor-pointer min-h-[170px] flex flex-col group my-4 bg-white shadow-sm border border-slate-200 rounded-lg group w-96 hover:shadow-lg duration-150 ease-linear hover:shadow-gray-400"
    >
      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-lg font-semibold group-hover:text-primaryColor">
          {project.name}
        </h5>
        <p className="text-slate-600 leading-normal font-light">
          {project.description}
        </p>
      </div>
    </div>
  ));

  return (
    <AuthenticatedLayout>
      <div className=" mt-2 pb-8 ">
        <h1 className="uppercase text-2xl ml-2 bg-primary  text-white p-2 font-bold">
          Choose Project TO Copy
        </h1>
        <div className="grid grid-cols-3 px-4">{mappedProjects}</div>
        <ProjectCopyDialog
          isCopyOpen={isCopyOpen}
          setIsCopyOpen={setIsCopyOpen}
          project={currentProject}
        />
      </div>
    </AuthenticatedLayout>
  );
}
