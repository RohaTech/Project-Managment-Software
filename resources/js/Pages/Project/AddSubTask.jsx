import { useForm } from '@inertiajs/react';
import React from 'react'

function AddSubTask({parentTaskId, setTaskList, projectId}) {
    // console.log(parentTaskId);
    const { data, setData, post, reset } = useForm({
        name: 'My SubTask',
        type: "N/A",
        project_id: projectId,
        assigned: '',
        status: '',
        priority: '',
        due_date: '',
        description: '',
        parent_task_id: parentTaskId
    });
    const handleAddNewTask= ()=>{
        console.log(`clicked: ${parentTaskId}`);
        post('/task', {
            onSuccess: (response)=>{
                const newTask = response.props.tasks; // Assuming the response contains the new task
                setTaskList(newTask);
            }
        });
    }

  return (
    <td colSpan="5" className="px-4 py-2 border border-slate-300 text-sm transition duration-200 ease-in-out w-fit cursor-pointer pl-10 border-l-0" onClick={() => handleAddNewTask(parentTaskId)}>
    + Add Subtask
</td>
    )
}

export default AddSubTask
