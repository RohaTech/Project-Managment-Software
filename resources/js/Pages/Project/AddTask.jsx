import { useForm } from "@inertiajs/react";
import React from "react";

function AddTask({ setTaskList, projectId }) {
    const { data, setData, post, reset } = useForm({
        name: "My Task",
        project_id: projectId,
        assigned: "",
        status: "",
        priority: "",
        due_date: "",
        description: "",
        parent_task_id: null,
    });

    const handleAddNewTask = () => {
        post("/task", {
            onSuccess: (response) => {

            const newTask = response.props.tasks; // Assuming the rhover:bg-gray-200esponse contains the new task
            setTaskList(newTask);
                    },
                }
            );
        }
  return (
    <button
    className=" transition duration-300 ease-in-out rounded-lg flex items-center px-2 py-1 text-sm"
    onClick={() => handleAddNewTask()}
>
    <span> +Add New</span>
</button>
  )

}

export default AddTask;
