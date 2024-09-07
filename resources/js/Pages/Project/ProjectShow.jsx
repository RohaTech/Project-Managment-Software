import React, { useEffect, useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PopOvers from "@/Components/ProjectComponent/PopOvers";
import PopEditProject from "./PopEditProject";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import ProjectAddField from "./ProjectAddField";
import axios from "axios";
import { Link } from "@inertiajs/react";

export default function ProjectShow({ project, tasks, users, members }) {
  const additional_column = JSON.parse(project.additional_column);
  let [isAddFieldOpen, setIsAddFieldOpen] = useState(false);

  const { data, setData, patch, processing, errors, reset } = useForm({
    additional_column:
      additional_column &&
      additional_column.map((item) => ({
        title: item.title,
        type: item.type,
      })),
  });
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    patch(route("project.additional-column.update", [project]), {
      " additional_column": data.additional_column,
    });
  };
  const handleProjectTitleChange = (index, value) => {
    const newAdditionalColumn = [...data.additional_column];
    newAdditionalColumn[index].title = value;
    setData("additional_column", newAdditionalColumn);
  };

  const statusOptions = [
    { value: "Not Started", label: "Not Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
  ];

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  let [isOpen, setIsOpen] = useState(false);
  let [openEdit, setOpenEdit] = useState(false);
  const [openSubTasks, setOpenSubTasks] = useState(tasks.map(() => false));

  const handleOpenSubtask = (index) => {
    setOpenSubTasks((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  console.log(tasks);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setOpenEdit(true); // Open the edit modal
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
            className="hover:bg-IconBg p-2 rounded-lg transition duration-300 ease-in-out text-xs text-primary"
          >
            Edit
          </button>
          <div>
            {openEdit && (
              <PopEditProject
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                project={project}
              />
            )}
          </div>
        </div>
        <div className="flex items-center mr-4 gap-x-4">
          <PopOvers members={members} />
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

      <div className="pl-4 mt-2 pb-1">
        <div className="flex items-center gap-x-2">
          {/* <p>List of tasks</p> */}
          <Link href={route("task.create")}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[10px] px-3 py-[5px] rounded-md shadow-md transition duration-300 ease-in-out capitalize flex gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={12}
              >
                <path
                  fill="#ffffff"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                />
              </svg>
              Add Tasks
            </button>
          </Link>
          <form className="max-w-[120px]">
            <label
              htmlFor="default-search"
              className="mb-2  text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center  pointer-events-none"></div>
              <input
                type="search"
                id="default-search"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 px-3 py-1"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-[6px]  backdrop:focus:ring-4  font-medium rounded-lg text-sm px-2"
              >
                <svg
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
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
        </div>
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-[390px] px-4 py-2 border border-l-4 border-l-sky-500 text-left border-slate-300">
                  Task Name
                </th>
                <th className="w-7/50 px-4 py-2 border text-left border-slate-300">
                  Assigned
                </th>
                <th className="w-7/50 px-4 py-2 border text-left border-slate-300">
                  Status
                </th>
                <th className="w-7/50 px-4 py-2 border border-r-0 text-left border-slate-300">
                  Priority
                </th>
                <th className="w-7/50 px-4 py-2 border text-left border-slate-300">
                  Due Date
                </th>
                {data.additional_column &&
                  data.additional_column.map((item, index) => (
                    <th
                      key={index}
                      className="w-[120px] px-4 py-2 border text-left border-slate-300"
                    >
                      <input
                        type="text"
                        className="w-[120px] px-4 py-2  border-none text-left  "
                        value={item.title}
                        onChange={(e) =>
                          handleProjectTitleChange(index, e.target.value)
                        }
                        onBlur={handleProjectSubmit}
                        errors={errors.additional_column}
                      />
                    </th>
                  ))}
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
                />
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                const { data, setData, patch, errors } = useForm({
                  name: task.name,
                  assigned: task.assigned,
                  status: task.status,
                  priority: task.priority,
                  due_date: task.due_date,
                  additional_column: task.additional_column,
                });

                const handleSubmit = (e) => {
                  e.preventDefault();
                  patch(`/task/${task.id}`);
                };
                const handleTaskTitleChange = (index, value) => {
                  const newAdditionalColumn = [...data.additional_column];
                  newAdditionalColumn[index].value = value;
                  setData("additional_column", newAdditionalColumn);
                };

                return (
                  <React.Fragment key={task.id}>
                    <tr key={task.id} className="border-collapse">
                      <td className="px-4 py-2 border border-l-4 border-l-sky-500 border-slate-300 flex items-center border-collapse">
                        <span
                          className="cursor-pointer"
                          onClick={() => handleOpenSubtask(index)}
                        >
                          {!openSubTasks[index] ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
                              viewBox="0 0 25 25"
                            >
                              <path d="M17.85,12.85l-10,10a.48.48,0,0,1-.7,0,.48.48,0,0,1,0-.7l9.64-9.65L7.15,2.85a.49.49,0,0,1,.7-.7l10,10A.48.48,0,0,1,17.85,12.85Z"></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
                              viewBox="0 0 30 30"
                            >
                              <path d="M3,12v-2c0-0.386,0.223-0.738,0.572-0.904s0.762-0.115,1.062,0.13L15,17.708l10.367-8.482 c0.299-0.245,0.712-0.295,1.062-0.13C26.779,9.261,27,9.614,27,10v2c0,0.3-0.135,0.584-0.367,0.774l-11,9 c-0.369,0.301-0.898,0.301-1.267,0l-11-9C3.135,12.584,3,12.3,3,12z"></path>
                            </svg>
                          )}
                        </span>

                        <form onSubmit={handleSubmit}>
                          <TextInput
                            value={data.name}
                            id="name"
                            onChange={(e) => setData("name", e.target.value)}
                            onBlur={handleSubmit}
                            className="border-0 w-[300px] shadow-none focus:ring-1 focus:border-slate-300 "
                          />
                        </form>
                        <Link href={route("task.show", [task.id])}>
                          <span className="ml-auto cursor-pointer p-[5px] rounded-lg hover:bg-slate-200 transition duration-300 ease-in-out">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              width={15}
                            >
                              <path
                                fill="#64748b"
                                d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"
                              />
                            </svg>
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-2 border border-slate-300">
                        <select
                          className="border-0"
                          onChange={(e) => setData("assigned", e.target.value)}
                          onBlur={handleSubmit}
                        >
                          {members.map((member, index) => (
                            <option
                              key={index}
                              value={member.id}
                              selected={member.id === task.assigned}
                            >
                              {member.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 border border-slate-300">
                        <select
                          className="border-0"
                          onChange={(e) => setData("status", e.target.value)}
                          onBlur={handleSubmit}
                        >
                          {statusOptions.map((status, index) => (
                            <option
                              key={index}
                              value={status.value}
                              selected={status.value === task.status}
                            >
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 border border-r-0 border-slate-300">
                        <select
                          className="border-0"
                          onChange={(e) => setData("priority", e.target.value)}
                          onBlur={handleSubmit}
                        >
                          {priorityOptions.map((priority, index) => (
                            <option
                              key={index}
                              value={priority.value}
                              selected={priority.value === task.priority}
                            >
                              {priority.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 border border-slate-300">
                        <input
                          type="date"
                          value={task.due_date ? formatDate(task.due_date) : ""}
                          onChange={(e) => setData("due_date", e.target.value)}
                          onBlur={handleSubmit}
                        />
                      </td>
                      {data.additional_column &&
                        data.additional_column.map((item, key) => (
                          <td className="px-4 py-2 border border-slate-300">
                            <input
                              value={item.value}
                              onChange={(e) =>
                                handleTaskTitleChange(key, e.target.value)
                              }
                              onBlur={handleSubmit}
                            />
                          </td>
                        ))}
                    </tr>
                    {openSubTasks[index] && (
                      <tr>
                        <td colSpan="6" className="pl-4 pt-2 pb-4">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="w-[390px] px-4 border border-l-0 text-left border-slate-300 font-medium">
                                  Subtask Name
                                </th>
                                <th className="w-7/50 px-4 border text-left border-slate-300 font-medium">
                                  Assigned
                                </th>
                                <th className="w-7/50 px-4 border text-left border-slate-300 font-medium">
                                  Status
                                </th>
                                <th className="w-7/50 px-4 border border-r-0 text-left border-slate-300 font-medium">
                                  Priority
                                </th>
                                <th className="w-7/50 px-4 border text-left border-slate-300 font-medium">
                                  Due Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {task.subtask.map((subs) => (
                                <tr key={subs.id} className="bg-gray-100">
                                  <td className="px-4 py-1 border border-l-0 border-slate-300">
                                    {subs.name}
                                  </td>
                                  <td className="px-4 py-1 border border-slate-300">
                                    {subs.assigned}
                                  </td>
                                  <td className="px-4 py-1 border border-slate-300">
                                    {subs.status}
                                  </td>
                                  <td className="px-4 py-1 border border-slate-300">
                                    {subs.priority}
                                  </td>
                                  <td className="px-4 py-1 border border-slate-300">
                                    {formatDate(subs.due_date)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
