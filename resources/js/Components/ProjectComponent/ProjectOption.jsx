import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ProjectShowCopyDialog from "./ProjectShowCopyDialog";
import ProjectDeletePop from "./ProjectDeletePop";
import ProjectEdit from "@/Pages/Project/ProjectEdit";
import PopEditProject from "@/Pages/Project/PopEditProject";
import PopTransferProject from "./PopTransferProject";
export default function ProjectOption({
  handleEditClick,
  handleDeleteClick,
  handleEditDuplicate,
  role,
  isCopyOpen,
  setIsCopyOpen,
  project,
  openEdit,
  setOpenEdit,
  openDelete,
  setOpenDelete,
  members,
}) {
  let [openTransfer, setOpenTransfer] = useState(false);

  const handleTransferClick = (e) => {
    e.preventDefault();
    setOpenTransfer(true);
  };
  return (
    <div className={` z-999    text-right `}>
      <Menu>
        <MenuButton className=" mt-3 px-1 focus:outline-none ">
          <svg
            className="fill-primaryColor  size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
          </svg>
        </MenuButton>

        <MenuItems
          transition
          anchor="right start"
          className="w-52 origin-top-right rounded-xl border  bg-white border-white/5 shadow-lg shadow-blue-200  p-1 text-sm/6     transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button
              onClick={handleEditClick}
              className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                role === "member" ? "hidden" : ""
              } `}
            >
              <svg
                className="size-3 fill-black/30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
              </svg>
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleEditDuplicate}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 "
            >
              <svg
                className="size-3 fill-black/30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
              </svg>
              Duplicate
            </button>
          </MenuItem>
          <ProjectShowCopyDialog
            isCopyOpen={isCopyOpen}
            setIsCopyOpen={setIsCopyOpen}
            project={project}
          />
          <div className="my-1 h-px " />

          <MenuItem>
            <button
              onClick={handleDeleteClick}
              className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                role === "owner" ? "" : "hidden"
              } `}
            >
              <svg
                className={`size-3 fill-black/30  `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
              </svg>
              Delete
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleTransferClick}
              className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                role === "owner" ? "" : "hidden"
              } `}
            >
              <svg
                className={`size-3 fill-black/30  `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z" />
              </svg>
              Transfer Ownership
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <div>
        {openEdit && (
          <PopEditProject
            role={role}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            project={project}
          />
        )}
      </div>
      <ProjectDeletePop
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        project={project}
      />

      <PopTransferProject
        setOpenTransfer={setOpenTransfer}
        openTransfer={openTransfer}
        project={project}
        members={members}
      />
    </div>
  );
}
