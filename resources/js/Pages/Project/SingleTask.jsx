import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

import { useEffect, useState } from "react";

import ApproveButton from "./ApproveButton";
import { useDrag, useDrop } from "react-dnd";
import IconCollection from "./SVGs/IconCollection";
import MemberName from "./MemberName"; // Import the custom component
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const ItemType = "ROW";

function SingleTask({
  task,
  handleToggle,
  openTasks,
  members,
  role,
  index,
  moveRow,
  projectType,
}) {
  // console.log(`Upper ${index}`);
  //   console.log(projectType);
  const [typeState, setTypeState] = useState([]);
  useEffect(() => {
    switch (projectType) {
      case "Software Development":
        setTypeState([
          "Requirement Gathering",
          "Design & Architecture",
          "Development",
          "Code Review",
          "Testing & QA",
          "Bug Fixing",
          "Deployment",
          "Maintenance",
          "Documentation",
          "User Training",
        ]);
        break;
      case "Construction":
        setTypeState([
          "Site Surveying",
          "Design & Planning",
          "Budgeting",
          "Permitting",
          "Foundation laying",
          "Structural Work",
          "Electrical & Plumbing",
          "Finishing Work",
          "Inspection & Handover",
        ]);
        break;
      case "Marketing":
        setTypeState([
          "Market Research",
          "Strategy Planning",
          "Content Creation",
          "Design & Development",
          "SEO & SEM",
          "Social Media",
          "Email Marketing",
          "Analytics & Reporting",
          "Client Meeting",
          "Campaign Launch",
        ]);
        break;
      case "Research & Development":
        setTypeState([
          "Idea Generation",
          "Research Planning",
          "Data Collection",
          "Data Analysis",
          "Hypothesis Testing",
          "Experimentation",
          "Results Interpretation",
          "Documentation",
          "Peer Review",
          "Publication",
          "Presentation",
        ]);
        break;
      case "Healthcare":
        setTypeState([
          "Patient Care Planning",
          "Clinical Trials",
          "Data Collection",
          "Data Analysis",
          "Treatment Administration",
          "Regulatory Compliance",
          "Medical Record Keeping",
          "Consultation & Diagnosis",
          "Health Education",
          "Reporting",
        ]);
        break;
      case "Education":
        setTypeState([
          "Curriculum Development",
          "Lesson Planning",
          "Content Creation",
          "Student Assessment",
          "Classroom Instruction",
          "Training & Workshops",
          "Grading & Feedback",
          "Student Support",
          "Event Organization",
          "Reporting and Accreditaion",
        ]);
        break;
      case "Manufacturing":
        setTypeState([
          "Product Design",
          "Prototyping",
          "Material Sourcing",
          "Production Planning",
          "Quality Control",
          "Assembly Line Setup",
          "Inventory Management",
          "Packaging",
          "Shipping & Logistics",
          "Maintenance",
        ]);
        break;
      case "Finance/Banking":
        setTypeState([
          "Risk Assessment",
          "Budgeting",
          "Financial Auditing",
          "Investment Analysis",
          "Compliance & Regulation",
          "Loan Processing",
          "Reporting",
          "Customer Management",
          "Fraud Detection",
          "Portfolio Management",
        ]);
        break;
      default:
        setTypeState([]);
    }
  }, [projectType]);

  const [, ref] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      // console.log(draggedItem);
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
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

  const [isEditing, setIsEditing] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // 'Aug', 'Oct', etc.
    // const year = date.getFullYear(); // Get the year
    return `${day} ${month}`;
  };

  const statusOptions = [
    {
      value: "Not Started",
      label: "Not Started",
      color: "bg-[#de2f4c] text-white text-sm",
    },
    {
      value: "In Progress",
      label: "In Progress",
      color: "bg-[#fdab3d] text-white text-sm",
    },
    {
      value: "Completed",
      label: "Completed",
      color: "bg-[#01c877] text-white text-sm",
    },
    {
      value: "Postponed",
      label: "Postponed",
      color: "bg-red-900 text-white  text-sm",
    },
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
    task.priority || null
  );
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  const { data, setData, patch, errors } = useForm({
    name: task.name,
    assigned: task.assigned,
    status: task.status,
    type: task.type,
    approved: task.approved,
    priority: task.priority,
    due_date: task.due_date,
    additional_column: task.additional_column,
  });

  const isDatePassed = (dateString) => {
    const today = new Date(); // Current date and time
    const inputDate = new Date(dateString); // Convert the input string to a Date object
    today.setHours(0, 0, 0, 0);
    // Compare the input date with today
    return inputDate < today; // true if the date is in the past
  };

  const handleSubmit = (e) => {
    setIsErrorMessage(true);
    e.preventDefault();
    patch(`/task/${task.id}`);
  };

  const handleAssignedSubmit = () => {
    setIsErrorMessage(true);
    patch(`/task/${task.id}`);
    return false;
  };

  const handleTaskTitleChange = (index, value) => {
    const newAdditionalColumn = [...data.additional_column];
    newAdditionalColumn[index].value = value;
    setData("additional_column", newAdditionalColumn);
  };

  const handlePriorityChange = (e) => {
    const selectedValue = e.target.value === "null" ? null : e.target.value;
    setSelectedPriority(selectedValue);
    console.log("Selected ", selectedValue);
    setData("priority", selectedValue);
  };
  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStatus(selectedValue);
    setData({
      ...data,
      status: selectedValue,
      approved: role !== "member" ? 1 : 0,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsErrorMessage(false);
    }, 2000);

    if (isErrorMessage && role === "member") {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [isErrorMessage]);

  return (
    <tr
      key={task.id}
      className="border-l-2 border-l-blue-500 border-collapse text-xs relative"
      ref={(node) => drag(ref(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {errors.Error && isErrorMessage && (
        <div className="shadow-md rounded-md text-xs mt-1 absolute -top-[35px] bg-red-500 text-white p-2 left-[400px]">
          {errors.Error}
        </div>
      )}
      <td className="px-4 border border-l-0 border-slate-300 flex items-center group border-collapse w-[350px] ">
        <span className="cursor-pointer" onClick={() => handleToggle(task.id)}>
          {openTasks[task.id] ? (
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
        <form onSubmit={handleSubmit} className="flex-grow">
          <input
            type="text"
            value={data.name}
            id="name"
            onChange={(e) => setData("name", e.target.value)}
            onBlur={handleSubmit}
            className="border-0 w-full focus:ring-0 focus:outline-none focus:border-slate-300 text-sm py-2"
          />
        </form>
        <Link href={route("task.show", task.id)}>
          {IconCollection.RightChevron}
        </Link>
      </td>
      <td className="border border-slate-300 border-collapse w-[150px]">
        <select
          className="border-0"
          onChange={(e) => setData("assigned", e.target.value)}
          onBlur={handleSubmit}
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.2rem",
          }}
        >
          {members.map((member, index) => (
            <option
              key={index}
              value={member.id}
              selected={member.id === task.assigned}
            >
              {member.name.split(" ")[0]}
            </option>
          ))}
        </select>
      </td>
      <td className="border border-slate-300 border-collapse w-[150px]">
        <select
          name="type"
          id="type"
          onChange={(e) => setData("type", e.target.value)}
          onBlur={handleSubmit}
          className="w-[180px] rounded-lg border-0"
        >
          {typeState.map((type) => {
            return (
              <option value={type} selected={data.type === type}>
                {type}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border border-slate-300 border-collapse relative">
        <select
          className={`border-0 text-sm ${
            selectedStatus === "Not Started"
              ? "bg-gray-200 text-black"
              : statusOptions.find((p) => p.value === selectedStatus)?.color
          }`}
          onChange={handleStatusChange}
          onBlur={handleSubmit}
        >
          {statusOptions.map((status, index) => (
            <option
              key={index}
              value={status.value}
              selected={status.value === task.status}
              className={status.color}
            >
              {status.label}
            </option>
          ))}
        </select>
        {role === "member" ? (
          <div className="group -top-3 z-99 cursor-pointer items-center gap-x-1  left-2 absolute flex">
            <svg
              className={`fill-primaryColor group size-5  ${
                data.approved ||
                data.status === "Not Started" ||
                data.status === null
                  ? "hidden"
                  : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
            <h3 className="group-hover:inline hidden p-1 bg-red-200 text-nowrap rounded text-red-600 text-sm">
              not approved
            </h3>
          </div>
        ) : (
          <ApproveButton ApproveData={data} task={task} />
        )}
      </td>
      <td className="border border-slate-300 border-collapse text-center cursor-pointer flex items-center w-[150px] overflow-hidden">
        {data.status === "Completed" ? (
          <div>{IconCollection.Completed}</div>
        ) : data.status === "Not Started" ? (
          <div>{IconCollection.NotStarted}</div>
        ) : data.status === "Postponed" ? (
          <div>{IconCollection.Postponed}</div>
        ) : data.status === "In Progress" && isDatePassed(data.due_date) ? (
          <div>{IconCollection.NotStarted}</div>
        ) : (
          <div>{IconCollection.InProgress}</div>
        )}
        {isEditing ? (
          <input
            type="date"
            value={data.due_date ? data.due_date : ""}
            onChange={(e) => setData("due_date", e.target.value)}
            onBlur={(e) => {
              setIsEditing(false);
              handleSubmit(e);
            }}
            autoFocus // Automatically focuses when switching to edit mode
            className="border-0  w-36 cursor-pointer"
          />
        ) : (
          <input
            type="text"
            value={
              data.due_date ? formatDate(data.due_date) : formatDate(Date.now())
            }
            onFocus={() => setIsEditing(true)} // Switch to date input when focused
            readOnly // Prevent manual editing in this mode
            className={`border-0 text-center w-36 cursor-pointer ${
              data.status === "Completed" ? "line-through" : ""
            }`}
            style={{
              lineHeight: "1.2rem",
            }}
          />
        )}
      </td>
      <td className="border border-r-0 border-slate-300 border-collapse">
        <select
          className={`border-0 w-25 flex ${
            selectedPriority === null
              ? "bg-gray-300 text-black" // Gray background for "Not Set"
              : priorityOptions.find((p) => p.value === selectedPriority)?.color // Dynamic color for priorities
          }`}
          onChange={handlePriorityChange}
          onBlur={handleSubmit}
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
              selected={priority.value === task.priority}
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

      {data.additional_column &&
        data.additional_column.map((item, index) => (
          <td key={index} className="border border-slate-300 border-collapse">
            <input
              value={item.value}
              type={item.type}
              onChange={(e) => handleTaskTitleChange(index, e.target.value)}
              onBlur={handleSubmit}
              style={{
                // padding: "8px", // Adds padding inside the select element
                fontSize: "0.875rem", // Optional: Adjusts font size for larger text
                lineHeight: "1.2rem",
              }}
            />
          </td>
        ))}
    </tr>
  );
}

export default SingleTask;
