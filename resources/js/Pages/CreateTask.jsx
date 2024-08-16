import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateTask({ projects }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        project_id: '',
        assigned: '',
        status: 'pending',
        priority: '',
        due_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/task');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Task</h2>}
        >
            <Head title="Create Task" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="project_id" className="block text-gray-700 text-sm font-bold mb-2">
                                    Project
                                </label>
                                <input
                                    type="text"
                                    id="project_id"
                                    value={data.project_id}
                                    onChange={e => setData('project_id', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.project_id && <div className="text-red-500 text-xs mt-1">{errors.project_id}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="assigned" className="block text-gray-700 text-sm font-bold mb-2">
                                    Assign to (Project Member)
                                </label>
                                <input
                                    type="text"
                                    id="assigned"
                                    value={data.assigned}
                                    onChange={e => setData('assigned', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.assigned && <div className="text-red-500 text-xs mt-1">{errors.assigned}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                                    Status
                                </label>
                                <input
                                    type="text"
                                    id="status"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
                                    Priority
                                </label>
                                <input
                                    type="text"
                                    id="priority"
                                    value={data.priority}
                                    onChange={e => setData('priority', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.priority && <div className="text-red-500 text-xs mt-1">{errors.priority}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="due_date" className="block text-gray-700 text-sm font-bold mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    id="due_date"
                                    value={data.due_date}
                                    onChange={e => setData('due_date', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.due_date && <div className="text-red-500 text-xs mt-1">{errors.due_date}</div>}
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Create Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
