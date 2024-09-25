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

export default function ProjectShow({
  project,
  tasks,
  users,
  members,
  membersRole,
}) {
  let [isOpen, setIsOpen] = useState(false);
  let [openEdit, setOpenEdit] = useState(false);
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

  return (
    <AuthenticatedLayout>
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
          <button
            onClick={handleEditClick}
            className={`bg-IconBg hover:bg-gray-300 py-1 px-4 mt-1 font-bold rounded-lg transition duration-300 ease-in-out text-xs text-primary ${
              role === "member" ? "hidden" : ""
            }`}
          >
            Edit
          </button>
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
                <div className="fixed inset-0 flex items-center justify-center p-4 ">
                  <Dialog.Panel className="bg-slate-200 rounded-lg p-6 max-w-sm w-[500px]">
                    <DialogTitle>Invite Team Members</DialogTitle>
                    <form className="flex gap-x-2">
                      <TextInput
                        id="email"
                        name="email"
                        className="mt-1 block w-full rounded-md border-gray-300 bg-slate-200 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter the email to invite"
                        isFocused={true}
                      />
                      <PrimaryButton className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                        Invite
                      </PrimaryButton>
                    </form>
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
                      <th className="w-[390px] px-4 py-2 border border-l-4 border-l-sky-500 text-left border-slate-300 sticky-column">
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
    </AuthenticatedLayout>
  );
}
