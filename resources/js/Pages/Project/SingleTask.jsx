import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

import { useEffect, useState } from "react";

import ApproveButton from "./ApproveButton";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "ROW";

function SingleTask({
  task,
  handleToggle,
  openTasks,
  members,
  role,
  index,
  moveRow,
}) {
  // console.log(`Upper ${index}`);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const statusOptions = [
    { value: "Not Started", label: "Not Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Postponed", label: "Postponed" },
  ];
  // console.log(tasks);
  const priorityOptions = [
    // {value: null, label: 'Not Set', color: 'bg-gray-300 text-black'},
    {
      value: "Low",
      label: "Low",
      color: "bg-[#de2f4c] text-white hover:bg-[#de2f42]",
    },
    {
      value: "Medium",
      label: "Medium",
      color: "bg-[#fdab3d] text-white hover:bg-[#fdab30]",
    },
    {
      value: "High",
      label: "High",
      color: "bg-[#01c877] text-white hover:bg-[#01c870]",
    },
  ];
  const [selectedPriority, setSelectedPriority] = useState(
    task.priority || null
  );

  const { data, setData, patch, errors } = useForm({
    name: task.name,
    assigned: task.assigned,
    status: task.status,
    approved: task.approved,
    priority: task.priority,
    due_date: task.due_date,
    additional_column: task.additional_column,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(`/task/${task.id}`);
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

  return (
    <tr
      key={task.id}
      className="border-l-2 border-l-blue-500 border-collapse"
      ref={(node) => drag(ref(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <td className="px-4 border border-l-0 border-slate-300 flex items-center group border-collapse w-[390px]">
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
            className="border-0 w-full focus:ring-0 focus:outline-none focus:border-slate-300"
          />
        </form>
        <Link href={route("task.show", task.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="18"
            height="18"
            viewBox="0 0 25 25"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-2000 ease-in-out  cursor-pointer"
          >
            <path d="M17.85,12.85l-10,10a.48.48,0,0,1-.7,0,.48.48,0,0,1,0-.7l9.64-9.65L7.15,2.85a.49.49,0,0,1,.7-.7l10,10A.48.48,0,0,1,17.85,12.85Z"></path>
          </svg>
        </Link>
      </td>
      <td className="px-4 border border-slate-300 border-collapse">
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
      <td className="px-4 border border-slate-300 border-collapse">
        <select
          className="border-0"
          onChange={(e) => {
            setData({
              ...data,
              status: e.target.value,
              approved: role !== "member" ? 1 : 0,
            });
          }}
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
        {role === "member" ? (
          <h6
            className={`text-sm p-1 text-primary ${
              data.approved ||
              data.status === "Not Started" ||
              data.status === null
                ? "hidden"
                : ""
            }`}
          >
            Not Approved
          </h6>
        ) : (
          <ApproveButton ApproveData={data} task={task} />
        )}
      </td>
      <td className="border border-r-0 border-slate-300 border-collapse">
        <select
          className={`border-0 w-40 flex ${
            selectedPriority === null
              ? "bg-gray-300 text-black" // Gray background for "Not Set"
              : priorityOptions.find((p) => p.value === selectedPriority)?.color // Dynamic color for priorities
          }`}
          onChange={handlePriorityChange}
          onBlur={handleSubmit}
          value={selectedPriority || "null"} // If selectedPriority is null, show "Not Set"
          style={{
            padding: "8px", // Adds padding inside the select element
            lineHeight: "1.8rem", // Increases the space between options when clicked
            fontSize: "1rem", // Optional: Adjusts font size for larger text
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
      <td className="px-4 border border-slate-300 border-collapse">
        <input
          type="date"
          value={task.due_date ? formatDatprioritye(task.due_date) : ""}
          onChange={(e) => setData("due_date", e.target.value)}
          onBlur={handleSubmit}
        />
      </td>

      {data.additional_column &&
        data.additional_column.map((item, index) => (
          <td
            key={index}
            className="px-4 border border-slate-300 border-collapse"
          >
            <input
              value={item.value}
              type={item.type}
              onChange={(e) => handleTaskTitleChange(index, e.target.value)}
              onBlur={handleSubmit}
            />
          </td>
        ))}
    </tr>
  );
}

export default SingleTask;
