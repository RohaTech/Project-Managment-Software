import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ subtask }) {
    const { data, setData, patch, errors } = useForm({
        name: subtask.name || '',
        task_id: subtask.task_id || '',
        status: subtask.status || '',
        priority: subtask.priority || '',
        due_date: subtask.due_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/subtask/${subtask.id}`);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Task</h2>}
        >
            <Head title={`Edit ${subtask.name}`} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    SubTask Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="task_id" className="block text-sm font-medium text-gray-700">
                                    Task ID
                                </label>
                                <input
                                    type="number"
                                    id="task_id"
                                    value={data.task_id}
                                    readOnly
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.task_id && <div className="text-red-500 text-sm mt-1">{errors.task_id}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <input
                                    type="text"
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                    Priority
                                </label>
                                <input
                                    type="text"
                                    id="priority"
                                    value={data.priority}
                                    onChange={(e) => setData('priority', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.priority && <div className="text-red-500 text-sm mt-1">{errors.priority}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    id="due_date"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.due_date && <div className="text-red-500 text-sm mt-1">{errors.due_date}</div>}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={`/subtask`}
                                    className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
