import React, { useEffect, useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import PopOvers from "@/Components/ProjectComponent/PopOvers";
import PopEditProject from "./PopEditProject";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function ProjectShow({ project, tasks, users, members }) {
    // const { data, setData, patch, errors } = useForm({
        // name: task.name || '',
        // project_id: task.project_id || '',
        // status: task.status || '',
        // priority: task.priority || '',
        // due_date: task.due_date || '',
    // });

    console.log(members);
    const statusOptions = [
        { value: 'Not Started', label: 'Not Started' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' },
    ];

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
    ];

    // Assume `assignedOptions` is an array of user objects, e.g., [{id: 1, name: 'John Doe'}, ...]
    const assignedOptions =members.map(member => ({ value: member.id, label: member.name }));

    let [isOpen, setIsOpen] = useState(false);
    let [openEdit, setOpenEdit] = useState(false);

    const { data, setData, patch, errors } = useForm({
        name: '',
        assigned: '',
        status: '',
        priority: '',
        due_date: ''
    });

    const [editableTask, setEditableTask] = useState(tasks.reduce((acc, task) => {
        acc[task.id] = task.name;
        return acc;
    }, {}));

    const [editableAssigned, setEditableAssigned] = useState(tasks.reduce((acc, task) => {
        acc[task.id] = task.assigned;
        return acc;
    }, {}));

    const [editableStatus, setEditableStatus] = useState(tasks.reduce((acc, task) => {
        acc[task.id] = task.status;
        return acc;
    }, {}));

    const [editablePriority, setEditablePriority] = useState(tasks.reduce((acc, task) => {
        acc[task.id] = task.priority;
        return acc;
    }, {}));

    const [editableDueDate, setEditableDueDate] = useState(tasks.reduce((acc, task) => {
        acc[task.id] = task.due_date;
        return acc;
    }, {}));




    const handleInputChange = (e, taskId) => {
        const updatedContent = {
            ...editableTask,
            [taskId]: e.target.value
        };
        setEditableTask(updatedContent);
        setData('name', e.target.value);
    };
const handleStatusChange = (e, taskId) => {
    const updatedStatus = {
        ...editableStatus,
        [taskId]: e.target.value
    };
    setEditableStatus(updatedStatus);
    setData('status', e.target.value);
    handleSubmit(e, taskId, 'status', e.target.value);
};

const handleAssignedChange = (e, taskId) => {
    const updatedAssigned = {
        ...editableAssigned,
        [taskId]: e.target.value
    };
    setEditableAssigned(updatedAssigned);
    setData('assigned', e.target.value);
    handleSubmit(e, taskId, 'assigned', e.target.value);
};

const handlePriorityChange = (e, taskId) => {
    const updatedPriority = {
        ...editablePriority,
        [taskId]: e.target.value
    };
    setEditablePriority(updatedPriority);
    setData('priority', e.target.value);
    handleSubmit(e, taskId, 'priority', e.target.value);

};

    const handleDueDateChange = (e, taskId) => {
        const updatedContent = {
            ...editableDueDate,
            [taskId]: e.target.value
        };
        setEditableDueDate(updatedContent);
        setData('due_date', e.target.value);



    };


    const handleSubmit = (e, taskId, field, value) => {
        e.preventDefault();
        patch(route('task.update', { id: taskId }), {
            [field]: value,
        });
    };

    const handleEditClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setOpenEdit(true);  // Open the edit modal
    };

    return (
        <AuthenticatedLayout>
            <div className="flex justify-between px-2 py-1 border-b border-[#eceff3]">
                <div className="flex items-center text-lg gap-x-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 64 64"><linearGradient id="SVGID_1__D47p6uA2kE9C_gr1" x1="34.455" x2="34.455" y1="21.936" y2="34.141" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#6dc7ff"></stop><stop offset="1" stopColor="#e6abff"></stop></linearGradient><path fill="url(#SVGID_1__D47p6uA2kE9C_gr1)" d="M47.4,23.4L43,24.5c-0.7,0.2-1,1.1-0.4,1.7l0.9,0.9l-5.8,5.8c-0.4,0.4-1,0.4-1.4,0l-5.7-5.2c-1.2-1.1-3.1-1-4.2,0.1l-6.1,6.4l1.5,1.4l6.1-6.4c0.4-0.4,1-0.4,1.4,0l5.7,5.2c1.2,1.1,3,1.1,4.1-0.1l5.8-5.8l0.9,0.9c0.5,0.5,1.5,0.3,1.7-0.4l1.2-4.4C48.8,23.9,48.1,23.2,47.4,23.4z"></path><linearGradient id="SVGID_2__D47p6uA2kE9C_gr2" x1="34" x2="34" y1="5.723" y2="56.766" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1a6dff"></stop><stop offset="1" stopColor="#c822ff"></stop></linearGradient><polygon fill="url(#SVGID_2__D47p6uA2kE9C_gr2)" points="45,38 43,38 43,47 40,47 40,39 38,39 38,47 35,47 35,37 33,37 33,47 30,47 30,36 28,36 28,47 25,47 25,40 23,40 23,47 21,47 21,49 47,49 47,47 45,47"></polygon><linearGradient id="SVGID_3__D47p6uA2kE9C_gr3" x1="32" x2="32" y1="5.723" y2="56.766" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1a6dff"></stop><stop offset="1" stopColor="#c822ff"></stop></linearGradient><path fill="url(#SVGID_3__D47p6uA2kE9C_gr3)" d="M55,13H17V6h-4c-3.9,0-7,3.1-7,7v38c0,1.8,0.7,3.6,2,4.9c1.3,1.4,3.1,2.1,5,2.1h42c1.7,0,3-1.3,3-3V16C58,14.3,56.7,13,55,13z M8,13c0-2.8,2.2-5,5-5h2v36h-1.7c-2,0-3.9,0.8-5.3,2.2V13z M52,55c0,0.6-0.4,1-1,1H13c-1.4,0-2.6-0.5-3.6-1.5c-0.9-1-1.5-2.3-1.4-3.6c0.1-2.7,2.4-4.8,5.2-4.8H17V15h34c0.6,0,1,0.4,1,1V55z M56,55c0,0.6-0.4,1-1,1h-1.2c0.1-0.3,0.2-0.6,0.2-1V16c0-0.4-0.1-0.7-0.2-1H55c0.6,0,1,0.4,1,1V55z"></path></svg>
                    </div>
                    <div className="capitalize font-bold">{project.name}</div>
                    <button onClick={handleEditClick} className="hover:bg-IconBg p-2 rounded-lg transition duration-300 ease-in-out text-xs text-primary">
                        Edit
                    </button>
                    <div>
                        {openEdit && (
                            <PopEditProject openEdit={openEdit} setOpenEdit={setOpenEdit} project={project} />
                        )}
                    </div>
                </div>
                <div className="flex items-center mr-4 gap-x-4">
                    <PopOvers members={members} />
                    <button onClick={() => setIsOpen(true)} className="bg-primary text-white px-2 py-1 rounded-lg flex items-center gap-x-1 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 30 30">
                            <path fill="#ffffff" d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
                        </svg>Invite
                    </button>
                    {isOpen && (
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 flex items-center justify-center p-4 ">
                            <Dialog.Panel className="bg-slate-200 rounded-lg p-6 max-w-sm w-[500px]">
                                <DialogTitle>Invite Team Members</DialogTitle>
                                <form className="flex gap-x-2">
                                    <TextInput
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-slate-200 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder = "Enter the email to invite"
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

            <div className="pl-4 mt-2 pb-1" >
                <div className="flex items-center gap-x-2">
                    {/* <p>List of tasks</p> */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[10px] px-3 py-[5px] rounded-md shadow-md transition duration-300 ease-in-out capitalize flex gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={12}><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>Add Tasks</button>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20}><path fill="#b0b0fd" d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
                filter
                </div>
                    </div>
                <div>
                <div class="p-2 pr-4">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-[390px] px-4 py-2 border border-l-0 text-left border-slate-300">Task Name</th>
                            <th className="w-7/50 px-4 py-2 border text-left border-slate-300">Assigned</th>
                            <th className="w-7/50 px-4 py-2 border text-left border-slate-300">Status</th>
                            <th className="w-7/50 px-4 py-2 border border-r-0 text-left border-slate-300">Priority</th>
                            <th className="w-7/50 px-4 py-2 border text-left border-slate-300">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>

    {tasks.map((task) => (
        <tr key={task.id}>
            <td className="px-4 py-2 border border-l-0 border-slate-300">
                <input
                    type="text"
                    value={editableTask[task.id]}
                    onChange={(e) => handleInputChange(e, task.id)}
                    onBlur={(e) => handleSubmit(e, task.id, 'name', e.target.value)}
                    className="w-full bg-white border-none focus:outline-none"
                />
            </td>
            <td className="px-4 py-2 border border-slate-300">
                <select
                    value={editableAssigned[task.id]}
                    onChange={(e) => handleAssignedChange(e, task.id)}
                    onBlur={(e) => handleSubmit(e, task.id, 'assigned', e.target.value)}
                    className="w-full bg-white border-none focus:outline-none"
                >
                    {assignedOptions.map(option => (
                        <option key={option.value} selected = {task.assigned === option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </td>
            <td className="px-4 py-2 border border-slate-300">
                <select
                    value={editableStatus[task.id]}
                    onChange={(e) => handleSubmit(e, task.id, 'status', e.target.value)}
                    // onBlur={(e) => handleSubmit(e, task.id, 'status', e.target.value)}
                    className="w-full bg-white border-none focus:outline-none"
                >
                    {statusOptions.map(option => (
                        <option key={option.value} selected = {task.status === option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </td>

            <td className="px-4 py-2 border border-slate-300">
                <select
                    value={editablePriority[task.id]}
                    onChange={(e) => handlePriorityChange(e, task.id)}
                    onBlur={(e) => handleSubmit(e, task.id, 'priority', e.target.value)}
                    className="w-full bg-white border-none focus:outline-none"
                >
                    {priorityOptions.map(option => (
                        <option key={option.value} selected = {task.priority === option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </td>
            <td className="px-4 py-2 border border-slate-300">
                <input
                    type="text"
                    value={editableDueDate[task.id]}
                    onChange={(e) => handleDueDateChange(e, task.id)}
                    onBlur={(e) => handleSubmit(e, task.id, 'due_date', e.target.value)}
                    className="w-full bg-white border-none focus:outline-none"
                />
            </td>
        </tr>
    ))}
</tbody>

                </table>
            </div>
        </div>
    </div>
</AuthenticatedLayout>
    );
}

{/* <span className="ml-auto cursor-pointer p-[5px] rounded-lg hover:bg-slate-200 transition duration-300 ease-in-out">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={15}><path fill="#64748b" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"/></svg>
                </span> */}


                /*
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 mx-auto cursor-pointer"><path fill="#64748b" d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/></svg>*/
