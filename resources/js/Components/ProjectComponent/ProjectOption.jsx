import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ProjectShowCopyDialog from "./ProjectShowCopyDialog";
import ProjectDeletePop from "./ProjectDeletePop";
import ProjectEdit from "@/Pages/Project/ProjectEdit";
import PopEditProject from "@/Pages/Project/PopEditProject";
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
}) {
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
    </div>
  );
}
