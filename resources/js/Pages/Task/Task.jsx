// import React, { useState, useEffect } from "react";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, Link } from "@inertiajs/react";
// import PrimaryButton from "@/Components/PrimaryButton";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// // Define the Zod schema for email validation
// const emailSchema = z.object({
//     email: z
//         .string()
//         .min(1, "Email is required")
//         .email("Invalid email address"),
// });

// // Example data for project members; replace with real data from your backend
// const projectMembers = [
//     {
//         id: 1,
//         name: "Alice",
//         profilePic:
//             "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
//     },
//     {
//         id: 2,
//         name: "Bob",
//         profilePic:
//             "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
//     },
//     {
//         id: 3,
//         name: "Charlie",
//         profilePic:
//             "https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.webp?b=1&s=612x612&w=0&k=20&c=XdZqQ92Yk82otKZio_pE0KURn0U08sIr5Vz9bFSm7bM=",
//     },
// ];

// const Task = ({ tasks, user }) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isValid },
//     } = useForm({
//         resolver: zodResolver(emailSchema),
//         mode: "onChange", // `onChange` mode for live validation
//     });

//     const onSubmit = (data) => {
//         console.log("Inviting user with email:", data.email);
//     };

//     const handleroute =(id) =>{
//         route("task.show", );
//     };
//     const [editing, setEditing] = useState({ taskId: null, field: null });
//     const [taskData, setTaskData] = useState(tasks);
  
//     // Handler for changing input values
//     const handleInputChange = (e, taskId, field) => {
//       const newTasks = taskData.map(task => {
//         if (task.id === taskId) {
//           return { ...task, [field]: e.target.value };
//         }
//         return task;
//       });
//       setTaskData(newTasks);
//     };
  
//     // Handler to toggle edit mode
//     const handleEditClick = (taskId, field) => {
//       setEditing({ taskId, field });
//     };
  
//     // Handler to save changes
//     const handleSave = () => {
//       // You can perform an API call here to save the changes
//       setEditing({ taskId: null, field: null });
//     };
  





















//     return (
//         <AuthenticatedLayout user={user}>
//             {/* Top Bar with Project Name and Member Avatars */}
//             <div className="flex pl-0   justify-between w-[100%] bg-gray-100 p-4 border-b-[0.01px]">
//                 {/* Project Name */}
//                 <h1 className="flex items-center text-lg font-bold">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         x="0px"
//                         y="0px"
//                         width="35"
//                         height="35"
//                         viewBox="0 0 64 64"
//                         className="mr-2"
//                     >
//                         <linearGradient
//                             id="SVGID_1__D47p6uA2kE9C_gr1"
//                             x1="34.455"
//                             x2="34.455"
//                             y1="21.936"
//                             y2="34.141"
//                             gradientUnits="userSpaceOnUse"
//                         >
//                             <stop offset="0" stopColor="#6dc7ff"></stop>
//                             <stop offset="1" stopColor="#e6abff"></stop>
//                         </linearGradient>
//                         <path
//                             fill="url(#SVGID_1__D47p6uA2kE9C_gr1)"
//                             d="M47.4,23.4L43,24.5c-0.7,0.2-1,1.1-0.4,1.7l0.9,0.9l-5.8,5.8c-0.4,0.4-1,0.4-1.4,0l-5.7-5.2	c-1.2-1.1-3.1-1-4.2,0.1l-6.1,6.4l1.5,1.4l6.1-6.4c0.4-0.4,1-0.4,1.4,0l5.7,5.2c1.2,1.1,3,1.1,4.1-0.1l5.8-5.8l0.9,0.9	c0.5,0.5,1.5,0.3,1.7-0.4l1.2-4.4C48.8,23.9,48.1,23.2,47.4,23.4z"
//                         ></path>
//                         <linearGradient
//                             id="SVGID_2__D47p6uA2kE9C_gr2"
//                             x1="34"
//                             x2="34"
//                             y1="5.723"
//                             y2="56.766"
//                             gradientUnits="userSpaceOnUse"
//                         >
//                             <stop offset="0" stopColor="#1a6dff"></stop>
//                             <stop offset="1" stopColor="#c822ff"></stop>
//                         </linearGradient>
//                         <polygon
//                             fill="url(#SVGID_2__D47p6uA2kE9C_gr2)"
//                             points="45,38 43,38 43,47 40,47 40,39 38,39 38,47 35,47 35,37 33,37 33,47 30,47 30,36 28,36 28,47 25,47 25,40 23,40 23,47 21,47 21,49 47,49 47,47 45,47"
//                         ></polygon>
//                         <linearGradient
//                             id="SVGID_3__D47p6uA2kE9C_gr3"
//                             x1="32"
//                             x2="32"
//                             y1="5.723"
//                             y2="56.766"
//                             gradientUnits="userSpaceOnUse"
//                         >
//                             <stop offset="0" stopColor="#1a6dff"></stop>
//                             <stop offset="1" stopColor="#c822ff"></stop>
//                         </linearGradient>
//                         <path
//                             fill="url(#SVGID_3__D47p6uA2kE9C_gr3)"
//                             d="M55,13H17V6h-4c-3.9,0-7,3.1-7,7v38c0,1.8,0.7,3.6,2,4.9c1.3,1.4,3.1,2.1,5,2.1h42c1.7,0,3-1.3,3-3V16 C58,14.3,56.7,13,55,13z M8,13c0-2.8,2.2-5,5-5h2v36h-1.7c-2,0-3.9,0.8-5.3,2.2V13z M52,55c0,0.6-0.4,1-1,1H13 c-1.4,0-2.6-0.5-3.6-1.5c-0.9-1-1.5-2.3-1.4-3.6c0.1-2.7,2.4-4.8,5.2-4.8H17V15h34c0.6,0,1,0.4,1,1V55z M56,55c0,0.6-0.4,1-1,1 h-1.2c0.1-0.3,0.2-0.6,0.2-1V16c0-0.4-0.1-0.7-0.2-1H55c0.6,0,1,0.4,1,1V55z"
//                         ></path>
//                     </svg>
//                     PM Software
//                 </h1>

//                 {/* Project Members and Invite Button */}
//                 <div className="flex items-center">
//                     {/* Member Avatars */}
//                     {projectMembers.map((member) => (
//                         <img
//                             key={member.id}
//                             src={member.profilePic}
//                             alt={member.name}
//                             className="w-8 h-8 rounded-full border-2 border-white -ml-2"
//                             title={member.name}
//                         />
//                     ))}

//                     <button
//                         className="ml-4 flex items-center rounded-md bg-primaryColor h-[30px] w-[80px] text-white p-2 hover:bg-primaryColor-dark focus:outline-none"
//                         onClick={() =>
//                             document.getElementById("my_modal_3").showModal()
//                         }
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="20"
//                             height="20"
//                             viewBox="0 0 48 48"
//                         >
//                             <linearGradient
//                                 id="SVGID_1__mvX5rQmbiHy1_gr1"
//                                 x1="46.042"
//                                 x2="18.849"
//                                 y1="7.958"
//                                 y2="35.151"
//                                 gradientUnits="userSpaceOnUse"
//                             >
//                                 <stop offset="0" stop-color="#60affe"></stop>
//                                 <stop offset=".033" stop-color="#6ab4fe"></stop>
//                                 <stop offset=".197" stop-color="#97cbfe"></stop>
//                                 <stop offset=".362" stop-color="#bddeff"></stop>
//                                 <stop offset=".525" stop-color="#daecff"></stop>
//                                 <stop offset=".687" stop-color="#eef7ff"></stop>
//                                 <stop offset=".846" stop-color="#fbfdff"></stop>
//                                 <stop offset="1" stop-color="#fff"></stop>
//                             </linearGradient>
//                             <path
//                                 fill="url(#SVGID_1__mvX5rQmbiHy1_gr1)"
//                                 d="M36,29.5c-2.002,0-3.792,0.907-4.984,2.331l-12.693-6.346C18.435,25.007,18.5,24.511,18.5,24	c0-0.512-0.065-1.007-0.177-1.484l12.693-6.346C32.208,17.593,33.998,18.5,36,18.5c3.59,0,6.5-2.91,6.5-6.5S39.59,5.5,36,5.5	s-6.5,2.91-6.5,6.5c0,0.512,0.065,1.007,0.177,1.484l-12.693,6.346C15.792,18.407,14.002,17.5,12,17.5c-3.59,0-6.5,2.91-6.5,6.5	s2.91,6.5,6.5,6.5c2.003,0,3.792-0.907,4.984-2.331l12.693,6.346C29.565,34.993,29.5,35.488,29.5,36c0,3.59,2.91,6.5,6.5,6.5	s6.5-2.91,6.5-6.5S39.59,29.5,36,29.5z"
//                             ></path>
//                             <path
//                                 fill="none"
//                                 stroke="#2e9bfe"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-miterlimit="10"
//                                 stroke-width="3"
//                                 d="M17.867,21.082c1.322,2.589,0.776,5.841-1.512,7.843c-2.701,2.364-6.808,2.091-9.172-0.61	s-2.091-6.808,0.61-9.172c1.038-0.908,2.283-1.428,3.557-1.569"
//                             ></path>
//                             <path
//                                 fill="none"
//                                 stroke="#2e9bfe"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-miterlimit="10"
//                                 stroke-width="3"
//                                 d="M42.466,12.665C42.134,15.942,39.365,18.5,36,18.5c-3.59,0-6.5-2.91-6.5-6.5s2.91-6.5,6.5-6.5	c1.594,0,3.053,0.573,4.184,1.525"
//                             ></path>
//                             <path
//                                 fill="none"
//                                 stroke="#2e9bfe"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-miterlimit="10"
//                                 stroke-width="3"
//                                 d="M36.364,28.97c1.634,0.144,3.215,0.902,4.366,2.246c2.336,2.726,2.019,6.829-0.707,9.165	s-6.829,2.019-9.165-0.707c-1.663-1.941-1.982-4.581-1.043-6.784"
//                             ></path>
//                             <line
//                                 x1="17.861"
//                                 x2="30.186"
//                                 y1="21.07"
//                                 y2="14.907"
//                                 fill="none"
//                                 stroke="#2e9bfe"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-miterlimit="10"
//                                 stroke-width="3"
//                             ></line>
//                             <line
//                                 x1="18.2"
//                                 x2="29.816"
//                                 y1="27.1"
//                                 y2="32.89"
//                                 fill="none"
//                                 stroke="#2e9bfe"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-miterlimit="10"
//                                 stroke-width="3"
//                             ></line>
//                         </svg>
//                         <p className="ml-1 text-sm">Share</p>
//                     </button>
//                     <dialog
//                         id="my_modal_3"
//                         className="modal w-[40%] h-[75%] rounded-xl mt-26"
//                     >
//                         <div className="modal-box">
//                             <div className=" h-[60px] flex items-center border-b-2 mr-1 ml-1">
//                                 <h1 className="text-2xl ml-2  mr-2 ">
//                                     {" "}
//                                     Share PM software project
//                                 </h1>

//                                 <form method="dialog">
//                                     {/* if there is a button in form, it will close the modal */}
//                                     <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//                                         <p className="font-bold mr-1 mt-3">
//                                             {" "}
//                                             ✕
//                                         </p>
//                                     </button>
//                                 </form>
//                             </div>

//                             <form
//                                 onSubmit={handleSubmit(onSubmit)}
//                                 className=" p-4 bg-white flex flex-row   "
//                             >
//                                 <div className="mb-4 ">
//                                     <label
//                                         htmlFor="email"
//                                         className="block text-gray-700 font-bold mb-2"
//                                     >
//                                         Invite User by Email
//                                     </label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         {...register("email")}
//                                         className={`md:w-[200px] w-[150px]  lg:w-[400px] px-3 py-2 border ${
//                                             errors.email
//                                                 ? "border-red-500"
//                                                 : "border-gray-300"
//                                         } rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor`}
//                                         placeholder="Enter email address"
//                                     />
//                                     {errors.email && (
//                                         <p className="mt-2 text-sm text-red-600">
//                                             {errors.email.message}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className={` md:w-[100px] lg:w-[100px] h-[42px] mt-8 ml-2 py-2 px-4 rounded-md text-white ${
//                                         isValid
//                                             ? "bg-primaryColor hover:bg-primaryColor-dark"
//                                             : "bg-blue-200 cursor-not-allowed"
//                                     } focus:outline-none`}
//                                     disabled={!isValid}
//                                 >
//                                     Invite
//                                 </button>
//                             </form>
//                         </div>
//                     </dialog>
//                 </div>
//             </div>

//             {/* Task List Header */}
//             <Head title="Task List" />
//             <div className="container mx-auto mt-6">
//                 <button className="w-[100px] h-[20] text-black bg-white border rounded-md text-sm mb-3 ">Add task</button>
//                 <table className="min-w-full bg-white shadow-md">
//       <thead className="bg-gray-100">
//         <tr className="border-b border-t ">
//           <th className="py-1 text-#EFF4FB font-light text-sm  px-3 border-b border-r w-[300px]">Task Name</th>
//           <th className="py-1 font-light text-sm  px-4 border-b border-r border-#EFF4FB">Assignee</th>
//           <th className="py-1 font-light text-sm  px-4 border-b border-r">Due date</th>
//           <th className="py-1 font-light text-sm  px-4 border-b">Status</th>
//           <th className="py-1 font-light text-sm  px-4 border-b border-l">Priority</th>
//         </tr>
//       </thead>
//       <tbody className="mt-6">
//         {taskData.map((task) => (
//           <tr key={task.id} className="hover:bg-gray-50">
//             {/* Task Name */}
//             <td
//               className="py-1 px-4 border-b border-r bg-blue-100"
//               onClick={() => handleEditClick(task.id, 'name')}
//             >
//               {editing.taskId === task.id && editing.field === 'name' ? (
//                 <input
//                   type="text"
//                   value={task.name}
//                   onChange={(e) => handleInputChange(e, task.id, 'name')}
//                   onBlur={handleSave}
//                   autoFocus
//                 />
//               ) : (
//                 task.name
//               )}
//                <Link href={route("task.show", [task.id])} >
//               <button>show</button>
//               </Link>
//             </td>
//             {/* Assignee */}
//             <td
//               className="py-1 px-4 border-b border-r"
//               onClick={() => handleEditClick(task.id, 'assigned')}
//             >
//               {editing.taskId === task.id && editing.field === 'assigned' ? (
//                 <input
//                   type="text"
//                   value={task.assigned}
//                   onChange={(e) => handleInputChange(e, task.id, 'assigned')}
//                   onBlur={handleSave}
//                   autoFocus
//                 />
//               ) : (
//                 task.assigned
//               )}
//             </td>
//             {/* Due Date */}
//             <td
//               className="py-1 px-4 border-b border-r"
//               onClick={() => handleEditClick(task.id, 'dueDate')}
//             >
//               {editing.taskId === task.id && editing.field === 'dueDate' ? (
//                 <input
//                   type="date"
//                   value={task.dueDate}
//                   onChange={(e) => handleInputChange(e, task.id, 'dueDate')}
//                   onBlur={handleSave}
//                   autoFocus
//                 />
//               ) : (
//                 task.dueDate
//               )}
//             </td>
//             {/* Status */}
//             <td
//               className="py-1 px-4 border-b border-r"
//               onClick={() => handleEditClick(task.id, 'status')}
//             >
//               {editing.taskId === task.id && editing.field === 'status' ? (
//                 <input
//                   type="text"
//                   value={task.status}
//                   onChange={(e) => handleInputChange(e, task.id, 'status')}
//                   onBlur={handleSave}
//                   autoFocus
//                 />
//               ) : (
//                 task.status
//               )}
//             </td>
//             {/* Priority */}
//             <td
//               className="py-1 px-4 border-b"
//               onClick={() => handleEditClick(task.id, 'priority')}
//             >
//               {editing.taskId === task.id && editing.field === 'priority' ? (
//                 <input
//                   type="text"
//                   value={task.priority}
//                   onChange={(e) => handleInputChange(e, task.id, 'priority')}
//                   onBlur={handleSave}
//                   autoFocus
//                 />
//               ) : (
//                 task.priority
//               )}
//             </td>
            
             
          
//           </tr>
//         ))}
//       </tbody>
//     </table>
//             </div>
//         </AuthenticatedLayout>
//     );
// };

// export default Task;
