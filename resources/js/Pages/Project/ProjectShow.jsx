import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PopOvers from "@/Components/ProjectComponent/PopOvers";
import PopEditProject from "./PopEditProject";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, usePage } from "@inertiajs/react";
import SingleTask from "./SingleTask";
import { router } from "@inertiajs/react";
// import { Inertia } from '@inertiajs/inertia';
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import SingleSubTask from "./SingleSubTask";
import ProjectAdditionalColumn from "./ProjectAdditionalColumn";
import ProjectAddField from "./ProjectAddField";
import ProjectStatus from "./ProjectStatus";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TaskSearch from "@/Components/ProjectComponent/TaskSearch";
import ProjectDeletePop from "@/Components/ProjectComponent/ProjectDeletePop";
import TaskDetail from "../Task/TaskDetail";

export default function ProjectShow({
  project,
  tasks,
  users,
  members,
  membersRole,
}) {
  let [isOpen, setIsOpen] = useState(false);
  let [openEdit, setOpenEdit] = useState(false);
  let [openDelete, setOpenDelete] = useState(false);
  //   const [openSubTasks, setOpenSubTasks] = useState(tasks.map(() => false));
  const [openTasks, setOpenTasks] = useState({}); // Single state object
  const [taskList, setTaskList] = useState(tasks);
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const { auth } = usePage().props;

  const [projectColumn, setProjectColumn] = useState(
    JSON.parse(project.additional_column)
  );

  const [role, setRole] = useState("");
  useEffect(() => {
    const roleIndex = membersRole.findIndex(
      (member) => member.user_id === auth.user.id
    );
    if (roleIndex !== -1) {
      setRole(membersRole[roleIndex].role);
    }
  }, []);

  const moveRow = (fromIndex, toIndex, parentTaskId = null) => {
    const updatedRows = [...taskList];
    if (parentTaskId) {
      const parentTask = updatedRows.find((task) => task.id === parentTaskId);
      const [movedRow] = parentTask.subtasks.splice(fromIndex, 1);
      parentTask.subtasks.splice(toIndex, 0, movedRow);
    } else {
      const [movedRow] = updatedRows.splice(fromIndex, 1);
      updatedRows.splice(toIndex, 0, movedRow);
    }
    setTaskList(updatedRows);
    saveOrder(updatedRows);
  };

  const saveOrder = (Rows) => {
    const orderedTasks = Rows.map((task, index) => ({
      id: task.id,
      order_column: index + 1, // New order value
    }));

    router.post("/task/updateOrder", { orderedTasks });
  };

  const handleToggle = (taskId) => {
    setOpenTasks((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setOpenEdit(true); // Open the edit modal
  };

  const handleDeleteClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setOpenDelete(true); // Open the edit modal
  };

  const renderSubtasks = (subtasks, level = 0, parent_id) => {
    return (
      <>
        {subtasks.map((subtask, index) => {
          return (
            <React.Fragment key={subtask.id}>
              <SingleSubTask
                subtask={subtask}
                handleToggle={handleToggle}
                openTasks={openTasks}
                members={members}
                level={level}
                role={role}
                index={index}
                moveRow={moveRow}
                parent_task_id={parent_id}
              />
              {openTasks[subtask.id] &&
                subtask.subtasks &&
                subtask.subtasks.length > 0 && (
                  <tr>
                    <td colSpan="5" className="pl-4 pt-2 pb-4">
                      <table className="w-full border-collapse">
                        <tbody>
                          {renderSubtasks(
                            subtask.subtasks,
                            level + 1,
                            subtask.id
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              {openTasks[subtask.id] && subtask.subtasks.length === 0 && (
                <tr>
                  <AddSubTask
                    parentTaskId={subtask.id}
                    setTaskList={setTaskList}
                    projectId={project.id}
                  />
                </tr>
              )}
            </React.Fragment>
          );
        })}
        <tr>
          <AddSubTask
            parentTaskId={subtasks[0]?.parent_task_id || null}
            setTaskList={setTaskList}
            projectId={project.id}
          />
        </tr>
      </>
    );
  };

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInvite = (e) => {
    e.preventDefault();
    setSuccessMessage("Sending invitation...");
    axios
      .post("http://127.0.0.1:8001/api/invite-member", {
        email,
        project: project.id,
      })
      .then((response) => {
        setSuccessMessage(
          response.data.message || "Invitation sent successfully!"
        );
        setEmail("");
      })
      .catch((error) => {
        console.error("Error sending invitation:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "There was an error sending the invitation. Please try again."
        );
      });
  };

  return (
    <AuthenticatedLayout>
      <div className="">
        <div className="flex justify-between px-2 py-1 border-b border-[#eceff3]">
          <div className="flex items-center text-lg gap-x-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 64 64"
              >
                <linearGradient
                  id="SVGID_1__D47p6uA2kE9C_gr1"
                  x1="34.455"
                  x2="34.455"
                  y1="21.936"
                  y2="34.141"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#6dc7ff"></stop>
                  <stop offset="1" stopColor="#e6abff"></stop>
                </linearGradient>
                <path
                  fill="url(#SVGID_1__D47p6uA2kE9C_gr1)"
                  d="M47.4,23.4L43,24.5c-0.7,0.2-1,1.1-0.4,1.7l0.9,0.9l-5.8,5.8c-0.4,0.4-1,0.4-1.4,0l-5.7-5.2c-1.2-1.1-3.1-1-4.2,0.1l-6.1,6.4l1.5,1.4l6.1-6.4c0.4-0.4,1-0.4,1.4,0l5.7,5.2c1.2,1.1,3,1.1,4.1-0.1l5.8-5.8l0.9,0.9c0.5,0.5,1.5,0.3,1.7-0.4l1.2-4.4C48.8,23.9,48.1,23.2,47.4,23.4z"
                ></path>
                <linearGradient
                  id="SVGID_2__D47p6uA2kE9C_gr2"
                  x1="34"
                  x2="34"
                  y1="5.723"
                  y2="56.766"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#1a6dff"></stop>
                  <stop offset="1" stopColor="#c822ff"></stop>
                </linearGradient>
                <polygon
                  fill="url(#SVGID_2__D47p6uA2kE9C_gr2)"
                  points="45,38 43,38 43,47 40,47 40,39 38,39 38,47 35,47 35,37 33,37 33,47 30,47 30,36 28,36 28,47 25,47 25,40 23,40 23,47 21,47 21,49 47,49 47,47 45,47"
                ></polygon>
                <linearGradient
                  id="SVGID_3__D47p6uA2kE9C_gr3"
                  x1="32"
                  x2="32"
                  y1="5.723"
                  y2="56.766"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#1a6dff"></stop>
                  <stop offset="1" stopColor="#c822ff"></stop>
                </linearGradient>
                <path
                  fill="url(#SVGID_3__D47p6uA2kE9C_gr3)"
                  d="M55,13H17V6h-4c-3.9,0-7,3.1-7,7v38c0,1.8,0.7,3.6,2,4.9c1.3,1.4,3.1,2.1,5,2.1h42c1.7,0,3-1.3,3-3V16C58,14.3,56.7,13,55,13z M8,13c0-2.8,2.2-5,5-5h2v36h-1.7c-2,0-3.9,0.8-5.3,2.2V13z M52,55c0,0.6-0.4,1-1,1H13c-1.4,0-2.6-0.5-3.6-1.5c-0.9-1-1.5-2.3-1.4-3.6c0.1-2.7,2.4-4.8,5.2-4.8H17V15h34c0.6,0,1,0.4,1,1V55z M56,55c0,0.6-0.4,1-1,1h-1.2c0.1-0.3,0.2-0.6,0.2-1V16c0-0.4-0.1-0.7-0.2-1H55c0.6,0,1,0.4,1,1V55z"
                ></path>
              </svg>
            </div>
            <div className="capitalize font-bold">{project.name}</div>
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
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ">
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
          </div>
          <div className="flex gap-x-8 items-center">
            <ProjectStatus project={project} role={role} />
            <div className="flex items-center mr-4 gap-x-4">
              <PopOvers members={members} project={project} role={role} />
              <button
                onClick={() => setIsOpen(true)}
                className="bg-primary text-white px-2 py-1 rounded-lg flex items-center gap-x-1 font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="15"
                  height="15"
                  viewBox="0 0 30 30"
                >
                  <path
                    fill="#ffffff"
                    d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"
                  ></path>
                </svg>
                Invite
              </button>
              {isOpen && (
                <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="relative z-50"
                >
                  <div className="fixed inset-0   flex items-center justify-center p-4 ">
                    <Dialog.Panel className="bg-slate-200 rounded-lg p-6 max-w-sm w-[500px]">
                      <DialogTitle>Invite Team Members</DialogTitle>
                      <form className="flex gap-x-2" onSubmit={handleInvite}>
                        <TextInput
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 bg-slate-200 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter the email to invite"
                          isFocused={true}
                        />
                        <PrimaryButton
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                        >
                          Invite
                        </PrimaryButton>
                      </form>
                      {errorMessage && (
                        <p className="mt-4 text-center text-red-500">
                          {errorMessage}
                        </p>
                      )}
                      {successMessage && (
                        <p className="mt-4 text-center text-green-500">
                          {successMessage}
                        </p>
                      )}
                    </Dialog.Panel>
                  </div>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        <div className="pl-4 mt-2 pb-1">
          <div className="flex items-center gap-x-2">
            <div className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[15px] px-3 py-[1px] rounded-md shadow-md transition duration-300 ease-in-out capitalize flex gap-x-1">
              <AddTask setTaskList={setTaskList} projectId={project.id} />
            </div>
            <TaskSearch project={project} />
            <div className="flex text-sm text-slate-400 gap-x-1 hover:bg-slate-200 transition duration-300 ease-in-out px-1 py-1 rounded-md cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={20}
              >
                <path
                  fill="#b0b0fd"
                  d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
                />
              </svg>
              filter
            </div>
            <div>
              <Link
                href={route("projectMessages.show", project.id)}
                className="flex flex-row gap-1 justify-center items-center hover:border-b"
              >
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/office/40/chat-message.png"
                  alt="chat-message"
                />
                <span className="text-slate-400 text-[13px] font-normal">
                  Discussion{" "}
                </span>
              </Link>
            </div>
          </div>
          <div>
            <div className="p-2 pr-4">
              <DndProvider backend={HTML5Backend}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mb-40">
                    <thead>
                      <tr>
                        <th className="w-[350px] px-4 py-2 border border-l-4 border-l-sky-500 text-left border-slate-300 sticky-column">
                          Task Name
                        </th>
                        <th className="w-7/50 px-4 py-2 border text-left border-slate-300">
                          Assigned
                        </th>
                        <th className="w-7/50 px-4 py-2 border text-left border-slate-300">
                          Status
                        </th>
                        <th className="w-7/50 px-4 py-2 border text-left border-slate-300">
                          Due Date
                        </th>
                        <th className="w-7/50 px-4 py-2 border border-r-0 text-left border-slate-300">
                          Priority
                        </th>
                        <ProjectAdditionalColumn
                          project={project}
                          setProjectColumn={setProjectColumn}
                          projectColumn={projectColumn}
                        />

                        <th
                          onClick={() => setIsAddFieldOpen(true)}
                          className="w-[200px]  cursor-pointer px-4 py-2 border text-left border-slate-300"
                        >
                          +
                        </th>
                        <ProjectAddField
                          setIsAddFieldOpen={setIsAddFieldOpen}
                          isAddFieldOpen={isAddFieldOpen}
                          project={project}
                          setProjectColumn={setProjectColumn}
                          projectColumn={projectColumn}
                        />
                      </tr>
                    </thead>

                    <tbody className="overflow-x-scroll">
                      {taskList.length > 0 ? (
                        taskList.map((task, index) => {
                          return (
                            <React.Fragment key={task.id}>
                              <SingleTask
                                key={task.id}
                                task={task}
                                handleToggle={handleToggle}
                                openTasks={openTasks}
                                members={members}
                                role={role}
                                index={index}
                                moveRow={moveRow}
                              />
                              {openTasks[task.id] &&
                                task.subtasks &&
                                task.subtasks.length > 0 && (
                                  <tr>
                                    <td colSpan="6">
                                      <table className="w-full">
                                        <tbody>
                                          {renderSubtasks(
                                            task.subtasks,
                                            1,
                                            task.id
                                          )}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                )}
                              {openTasks[task.id] &&
                                task.subtasks.length === 0 && (
                                  <tr>
                                    <AddSubTask
                                      parentTaskId={task.id}
                                      setTaskList={setTaskList}
                                      projectId={project.id}
                                    />
                                    {/* <td colSpan="5" className="px-4 py-2 border border-slate-300 cursor-pointer pl-10 border-l-0" onClick={() => handleAddNewTask(task.id)}>
                                                      + Add Subtask
                                                  </td> */}
                                  </tr>
                                )}
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5">
                            <div className="flex mx-auto w-1/4">
                              <img
                                src="/image/sky-productive-man-marking-tasks-as-completed.svg"
                                alt="No tasks available"
                                className="w-full"
                              />
                            </div>
                            <h3 className="text-center font-bold text-2xl text-blue-950 py-2 ">
                              No Tasks Available
                            </h3>
                          </td>
                        </tr>
                      )}
                      <tr className="">
                        <td
                          colSpan="5"
                          className={`${
                            taskList.length > 0
                              ? "border border-gray-300 text-gray-400 pl-2 border-x-0"
                              : "px-6 py-2  text-white border-b-2"
                          } `}
                        >
                          <div
                            className={`${
                              taskList.length > 0
                                ? "hover:bg-gray-200 w-fit"
                                : "hover:bg-blue-700 w-fit mx-auto bg-blue-500 rounded-lg px-6 py-1 transition duration-500 ease-in-out"
                            }`}
                          >
                            <AddTask
                              setTaskList={setTaskList}
                              projectId={project.id}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* {renderSubtasks(tasks)} */}
                    </tbody>
                  </table>
                </div>
              </DndProvider>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
