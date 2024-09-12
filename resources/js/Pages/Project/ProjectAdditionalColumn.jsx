import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import ProjectAdditionalColumnModal from "./ProjectAdditionalColumnModal";

export default function ProjectAdditionalColumn({ project }) {
  const additional_column = JSON.parse(project.additional_column);
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState();
  const { data, setData, patch, processing, errors, reset } = useForm({
    additional_column:
      additional_column &&
      additional_column.map((item) => ({
        title: item.title,
        type: item.type,
      })),
  });
  //   console.log(additional_column);
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    patch(route("project.additional-column.update", [project]));
  };

  const handleProjectTitleChange = (index, value) => {
    const newAdditionalColumn = [...data.additional_column];
    newAdditionalColumn[index].title = value;
    setData("additional_column", newAdditionalColumn);
  };

  return (
    <>
      {data.additional_column &&
        data.additional_column.map((item, index) => (
          <th
            key={index}
            className="w-[120px]  relative  px-4 py-2 border group text-left border-slate-300"
          >
            <input
              type="text"
              name="projectTitle"
              id="projectTitle"
              className="w-[120px] px-4 py-2   border-none text-left  "
              value={item.title}
              onChange={(e) => handleProjectTitleChange(index, e.target.value)}
              onBlur={handleProjectSubmit}
              errors={errors.additional_column}
            />

            <svg
              onClick={() => {
                setConfirmingUserDeletion(true);
                setDeleteTitle(item.title);
              }}
              className="z-50 fill-red-400 size-5 cursor-pointer absolute opacity-0 group-hover:opacity-100 top-5 right-3"
              xmlns="http://www.w3.org/200ssss0/svg"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
            <ProjectAdditionalColumnModal
              confirmingUserDeletion={confirmingUserDeletion}
              setConfirmingUserDeletion={setConfirmingUserDeletion}
              project={project}
              deleteTitle={deleteTitle}
              additional_column={additional_column}
            />
          </th>
        ))}
    </>
  );
}
