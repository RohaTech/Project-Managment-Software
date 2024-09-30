import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "SUbTASK";

function SingleSubTask({
  subtask,
  handleToggle,
  openTasks,
  members,
  level,
  role,
  index,
  moveRow,
  parent_task_id,
}) {
  const [, ref] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (
        draggedItem.index !== index ||
        draggedItem.parent_task_id !== parent_task_id
      ) {
        moveRow(draggedItem.index, index, parent_task_id);
        draggedItem.index = index;
        draggedItem.parent_task_id = parent_task_id;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const statusOptions = [
    { value: "Not Started", label: "Not Started", color: "bg-[#de2f4c] text-white text-sm", },
    { value: "In Progress", label: "In Progress", color: "bg-[#fdab3d] text-white text-sm",},
    { value: "Completed", label: "Completed", color: "bg-[#01c877] text-white text-sm",},
    { value: "Postponed", label: "Postponed", color: "bg-red-900 text-white  text-sm",},
  ];
  // console.log(tasks);
  const priorityOptions = [
      // {value: null, label: 'Not Set', color: 'bg-gray-300 text-black'},
        {
            value: "High",
            label: "High",
            color: "bg-blue-700 text-white text-sm",
        },
        {
            value: "Medium",
            label: "Medium",
            color: "bg-blue-500 text-white text-sm",
        },
        {
        value: "Low",
        label: "Low",
        color: "bg-blue-300 text-white text-sm",
        },
];
  const [selectedPriority, setSelectedPriority] = useState(
    subtask.priority || null
  );
  const [selectedStatus, setSelectedStatus] = useState(subtask.status);

  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, patch, errors } = useForm({
    name: subtask.name,
    assigned: subtask.assigned,
    status: subtask.status,
    priority: subtask.priority,
    due_date: subtask.due_date,
  });

  const handleSubtaskSubmit = (e) => {
    e.preventDefault();
    patch(`/task/${subtask.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // 'Aug', 'Oct', etc.
    // const year = date.getFullYear(); // Get the year
    return `${day} ${month}`;
  };

  const handlePriorityChange = (e) => {
    const selectedValue = e.target.value === "null" ? null : e.target.value;
    setSelectedPriority(selectedValue);
    console.log("Selected ", selectedValue);
    setData("priority", selectedValue);
  };

  const handleStatusChange = (e) =>{
    const selectedValue = e.target.value;
    setSelectedStatus(selectedValue);
    setData("status", selectedValue,);
  }
  const isDatePassed = (dateString) => {
    const today = new Date(); // Current date and time
    const inputDate = new Date(dateString); // Convert the input string to a Date object

    // Remove the time part from today's date
    today.setHours(0, 0, 0, 0);

    // Compare the input date with today
    return inputDate < today; // true if the date is in the past
  };


  return (
    <tr
      className={`bg-blue-${100 + level * 50}`}
      ref={(node) => drag(ref(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <td className="px-4 border border-l-0 border-slate-300 flex items-center group transition duration-600 ease-in-out">
        <span
          className="cursor-pointer"
          onClick={() => handleToggle(subtask.id)}
        >
          {openTasks[subtask.id] ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="15"
              height="15"
            >
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              width="15"
              height="15"
            >
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
          )}
        </span>
        <form onSubmit={handleSubtaskSubmit} className="flex-grow">
          <input
            type="text"
            value={data.name}
            id="name"
            onChange={(e) => setData("name", e.target.value)}
            onBlur={handleSubtaskSubmit}
            className="border-0 w-full focus:ring-0 text-sm focus:border-slate-300"
          />
        </form>
        <Link href={route("task.show", subtask.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="18"
              height="18"
              viewBox="0 0 25 25"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-2000 ease-in-out cursor-pointer"
            >
              <path d="M17.85,12.85l-10,10a.48.48,0,0,1-.7,0,.48.48,0,0,1,0-.7l9.64-9.65L7.15,2.85a.49.49,0,0,1,.7-.7l10,10A.48.48,0,0,1,17.85,12.85Z"></path>
            </svg>
        </Link>
      </td>

      <td className="border border-slate-300">
        <select
          className="border-0"
          onChange={(e) => setData("assigned", e.target.value)}
          onBlur={handleSubtaskSubmit}
          style={{
            fontSize: "0.875rem",
            lineHeight: "0.9rem"
          }}
        >
          {members.map((member, index) => (
            <option
              key={index}
              value={member.id}
              selected={member.id === subtask.assigned}
            >
              {member.name.split(' ')[0]}
            </option>
          ))}{" "}
        </select>
      </td>
      <td className="border border-slate-300 border-collapse">
        <select
           className={`border-0 text-sm ${selectedStatus === "Not Started" ?
            "bg-gray-200 text-black":statusOptions.find((p)=>p.value === selectedStatus)?.color}`}
          onChange={handleStatusChange}
          onBlur={handleSubtaskSubmit}
        >
          {statusOptions.map((status, index) => (
            <option
              key={index}
              value={status.value}
              selected={status.value === subtask.status}
              className={status.color}
            >
              {status.label}
            </option>
          ))}
        </select>
      </td>
      <td className="border border-slate-300 text-center cursor-pointer flex items-center">
      { data.status === "Completed" ? (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
            <linearGradient id="FR_9NzDz28iTOUpGSsOFAa_91kLZWvmd4sg_gr1" x1="10.043" x2="38.307" y1="10.241" y2="38.504" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#21ad64"></stop><stop offset="1" stopColor="#088242"></stop></linearGradient><path fill="url(#FR_9NzDz28iTOUpGSsOFAa_91kLZWvmd4sg_gr1)" d="M26.314,5.115l0.719,0.83l0.949-0.552c1.612-0.937,3.68-0.227,4.377,1.502l0.41,1.018	L33.845,7.7c1.829-0.363,3.554,0.98,3.652,2.842l0.057,1.096l1.088,0.148c1.848,0.251,3.043,2.081,2.531,3.874l-0.302,1.055	l0.981,0.493c1.666,0.837,2.203,2.957,1.136,4.486l-0.628,0.9l0.768,0.785c1.304,1.333,1.123,3.512-0.382,4.611l-0.886,0.648	l0.471,0.991c0.801,1.684-0.078,3.686-1.859,4.238l-1.049,0.325l0.124,1.091c0.211,1.853-1.27,3.461-3.134,3.404l-1.097-0.033	l-0.237,1.072c-0.402,1.821-2.325,2.861-4.07,2.202l-1.027-0.388l-0.572,0.937c-0.972,1.591-3.128,1.951-4.564,0.762L24,42.538	l-0.845,0.7c-1.436,1.189-3.592,0.83-4.564-0.762l-0.572-0.937l-1.027,0.388c-1.744,0.659-3.667-0.382-4.07-2.202l-0.237-1.072	l-1.097,0.033c-1.864,0.057-3.344-1.552-3.134-3.404l0.124-1.091l-1.049-0.325c-1.781-0.551-2.659-2.554-1.859-4.238l0.471-0.991	l-0.886-0.648c-1.506-1.1-1.686-3.279-0.382-4.611l0.768-0.785l-0.628-0.9c-1.067-1.529-0.53-3.649,1.136-4.486l0.981-0.493	L6.828,15.66c-0.513-1.793,0.683-3.623,2.531-3.874l1.088-0.148l0.057-1.096c0.097-1.862,1.823-3.205,3.652-2.842l1.077,0.214	l0.41-1.018c0.697-1.729,2.765-2.439,4.377-1.502l0.949,0.552l0.719-0.83C22.907,3.705,25.093,3.705,26.314,5.115z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fcff63" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
        </svg>
    </div>):

    data.status === "Not Started" ? (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
            <path fill="#f44336" d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"></path><path fill="#ffebee" d="M22 10h4v21h-4V10zM22 34h4v4h-4V34z"></path>
        </svg>
    </div>):

    data.status === "Postponed" ? (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="23" viewBox="0 0 48 48">
                <path fill="#3949AB" d="M32.615 12.257H36.615V17.256999999999998H32.615z" transform="rotate(38.956 34.616 14.757)"></path><path fill="#3949AB" d="M21 9H27V13H21z"></path><path fill="#EEE" d="M24 14.5A13.5 13.5 0 1 0 24 41.5A13.5 13.5 0 1 0 24 14.5Z"></path><path fill="#263238" d="M22.634,30.118c1.173,0.763,2.741,0.422,3.492-0.765c0.754-1.186,0.412-2.762-0.764-3.529c-1.176-0.761-2.736-0.417-3.493,0.773C21.116,27.782,21.456,29.361,22.634,30.118"></path><path fill="#263238" d="M14.778 22L24.199 26.084 22.38 28.943z"></path><path fill="#9FA8DA" d="M23.545,28.691c0.392,0.251,0.913,0.137,1.161-0.261c0.252-0.393,0.139-0.92-0.255-1.171c-0.388-0.256-0.913-0.14-1.165,0.254C23.036,27.909,23.15,28.438,23.545,28.691"></path><g><path fill="#90A4AE" d="M24.991 13.06c-.374-.025-.745-.06-1.12-.06-.296 0-.586.031-.88.047V18h2V13.06zM24.991 38.06c-.374-.025-.745-.06-1.12-.06-.296 0-.586.031-.88.047V43h2V38.06zM9.051 29c-.025-.374-.06-.745-.06-1.12 0-.296.031-.586.047-.88h4.953v2H9.051zM34.051 29c-.025-.374-.06-.745-.06-1.12 0-.296.031-.586.047-.88h4.953v2H34.051zM32.27 15.522c-.313-.208-.617-.421-.943-.607-.257-.146-.523-.263-.787-.396l-2.456 4.301 1.736.992L32.27 15.522zM19.87 37.23c-.312-.207-.617-.421-.942-.606-.258-.147-.524-.264-.788-.396l-2.456 4.301 1.736.992L19.87 37.23zM32.23 33.857c.163-.337.317-.677.504-1.002.146-.257.317-.493.477-.741l4.302 2.457-.992 1.736L32.23 33.857zM37.27 21.078c-.174-.333-.337-.667-.532-.988-.154-.252-.332-.482-.498-.727l-4.229 2.578 1.041 1.708L37.27 21.078zM15.922 34.089c-.173-.332-.337-.667-.532-.986-.154-.254-.331-.484-.498-.728l-4.229 2.578 1.041 1.708L15.922 34.089zM15.361 15.762c.307-.215.605-.438.926-.633.253-.154.517-.278.776-.418l2.577 4.229-1.708 1.04L15.361 15.762zM28.373 37.11c.306-.216.604-.439.926-.634.252-.154.516-.278.775-.419l2.578 4.23-1.708 1.04L28.373 37.11z"></path></g><g><path fill="#7986CB" d="M37.891 15.477c-.347.43-.977.497-1.406.149l-3.11-2.515c-.43-.348-.496-.977-.149-1.406l1.887-2.333c.348-.431.977-.497 1.406-.149l3.11 2.515c.43.348.497.977.149 1.406L37.891 15.477zM24 12c-8.835 0-16 7.165-16 16s7.165 16 16 16 16-7.165 16-16S32.835 12 24 12zM24 41c-7.181 0-13-5.819-13-13 0-7.18 5.819-13 13-13s13 5.82 13 13C37 35.181 31.181 41 24 41zM29 9c0 .553-.447 1-1 1h-8c-.553 0-1-.447-1-1V5c0-.553.447-1 1-1h8c.553 0 1 .447 1 1V9z"></path></g>
            </svg>
</div>):

    data.status === "In Progress" && isDatePassed(data.due_date) ? (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
            <path fill="#f44336" d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"></path><path fill="#ffebee" d="M22 10h4v21h-4V10zM22 34h4v4h-4V34z"></path>
        </svg>
    </div>) : (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
            <path d="M 11 0 L 11 2.0566406 C 7.3347361 2.4216277 4.2536462 4.7611035 2.8378906 8 L 5.078125 8 C 6.3033839 5.885012 8.467233 4.3858257 11 4.0683594 L 11 6 L 12.935547 4.0644531 C 12.956718 4.0669824 12.978871 4.0657182 13 4.0683594 L 13 4 L 14 3 L 11 0 z M 16 2.8378906 L 16 5.078125 C 18.114988 6.3033839 19.614174 8.467233 19.931641 11 L 18 11 L 19.935547 12.935547 C 19.933018 12.956718 19.934282 12.978871 19.931641 13 L 20 13 L 21 14 L 24 11 L 21.943359 11 C 21.578372 7.3347361 19.238896 4.2536462 16 2.8378906 z M 3 10 L 0 13 L 2.0566406 13 C 2.4216277 16.665264 4.7611035 19.746354 8 21.162109 L 8 18.921875 C 5.885012 17.696616 4.3858257 15.532767 4.0683594 13 L 6 13 L 4.0644531 11.064453 C 4.0669824 11.043282 4.0657182 11.021129 4.0683594 11 L 4 11 L 3 10 z M 18.921875 16 C 17.696616 18.114988 15.532767 19.614174 13 19.931641 L 13 18 L 11.064453 19.935547 C 11.043282 19.933018 11.021129 19.934282 11 19.931641 L 11 20 L 10 21 L 13 24 L 13 21.943359 C 16.665264 21.578372 19.746354 19.238896 21.162109 16 L 18.921875 16 z"></path>
        </svg>
    </div>
)}
      {isEditing ? (
        <input
          type="date"
          value={data.due_date ? data.due_date : ""}
          onChange={(e) => setData("due_date", e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            handleSubmit();
          }}
          autoFocus // Automatically focuses when switching to edit mode
          className="border-0  w-20 cursor-pointer"
        />
      ) : (
        <input
          type="text"
          value={data.due_date ? formatDate(data.due_date) : formatDate(Date.now())}
          onFocus={() => setIsEditing(true)} // Switch to date input when focused
          readOnly // Prevent manual editing in this mode
          className={`border-0 text-center w-20 cursor-pointer ${data.status==="Completed"? 'line-through': ''}`}
          style={{
            lineHeight:"1.2rem"
          }}
        />
      )}
      </td>
      <td className="border border-slate-300">
        <select
         className={`border-0 w-25 flex ${
            selectedPriority === null
              ? "bg-gray-300 text-black" // Gray background for "Not Set"
              : priorityOptions.find((p) => p.value === selectedPriority)?.color // Dynamic color for priorities
          }`}
          onChange={handlePriorityChange}
          onBlur={handleSubtaskSubmit}
          value={selectedPriority || "null"} // If selectedPriority is null, show "Not Set"
          style={{
            // padding: "8px", // Adds padding inside the select element
            fontSize: "0.9rem", // Optional: Adjusts font size for larger text
          }}

        >
        <option value="null" className="bg-gray-300 text-black h-10">
            Not Set
        </option>
          {priorityOptions.map((priority, index) => (
            <option
              key={index}
              value={priority.value}
              selected={priority.value === subtask.priority}
              className={priority.color}
              style={{
                padding: "10px", // Adds padding inside each option
                fontSize: "1rem", // Adjust font size
              }}
            >
              {priority.label}
            </option>
          ))}
        </select>
      </td>

    </tr>
  );
}

export default SingleSubTask;
