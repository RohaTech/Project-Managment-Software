import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React from 'react'

function SingleTask({task, handleToggle, openTasks, members}) {
    // console.log(openTasks);

    const statusOptions = [
        { value: 'Not Started', label: 'Not Started' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Pending', label: 'Pending' },
    ];
// console.log(tasks);
    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
    ];
    


    const { data, setData, patch, errors } = useForm({
        name: task.name,
        assigned: task.assigned,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/task/${task.id}`);
    };

    return (
        // <div>{task.name}</div>
        <tr key = {task.id} className="border-l-2 border-l-blue-500">
        <td className="px-4 py-2 border border-l-0 border-slate-300 flex items-center group">
                <span className="cursor-pointer" onClick={() => handleToggle(task.id)}>
                    {openTasks[task.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="15" height="15"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width="15" height="15"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
                    )}
                </span>
            <form onSubmit={handleSubmit} className="flex-grow">
                <TextInput
                    value={data.name}
                    id="name"
                    onChange={(e) => setData('name', e.target.value)}
                    onBlur={handleSubmit}
                    className="border-0 w-full focus:ring-0 focus:border-slate-300"
                />
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 25 25"  
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-2000 ease-in-out  cursor-pointer">
                <path d="M17.85,12.85l-10,10a.48.48,0,0,1-.7,0,.48.48,0,0,1,0-.7l9.64-9.65L7.15,2.85a.49.49,0,0,1,.7-.7l10,10A.48.48,0,0,1,17.85,12.85Z"></path>
            </svg>
        </td>
        <td className="px-4 py-2 border border-slate-300">
            <select className="border-0" onChange={(e)=> setData('assigned', e.target.value)} onBlur={handleSubmit}>
                {members.map((member, index) => (
                    <option key={index} value={member.id} selected={member.id === task.assigned}>{member.name}</option>
                ))}
            </select>
        </td>
        <td className="px-4 py-2 border border-slate-300">
            <select className="border-0" onChange={(e)=> setData('status', e.target.value)} onBlur={handleSubmit}>
                {statusOptions.map((status, index) => (
                    <option key={index} value={status.value} selected={status.value === task.status}>{status.label}</option>
                ))}
            </select>
        </td>
        <td className="px-4 py-2 border border-r-0 border-slate-300">
            <select className="border-0" onChange={(e)=> setData('priority', e.target.value)} onBlur={handleSubmit}>
                {priorityOptions.map((priority, index)=> (
                    <option key={index} value={priority.value} selected={priority.value === task.priority}>{priority.label}</option>
                ))}
            </select>
        </td>
        <td className="px-4 py-2 border border-slate-300">
            <input
                type="date"
                value={task.due_date ? formatDate(task.due_date) : ''}
                onChange={(e) => setData('due_date', e.target.value)}
                onBlur={handleSubmit}
            />
        </td>
    </tr>
    )
}

export default SingleTask;
