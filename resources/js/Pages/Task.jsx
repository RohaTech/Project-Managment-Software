import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Task({ tasks }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            destroy(route('task.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Tasks</h2>}
        >
            <Head title="tasks" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="text-2xl font-bold mb-4">List of Tasks</h2>
                        <ul className="space-y-4">
                            {tasks.map((task) => (
                                <li key={task.id} className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg shadow">
                                    <Link
                                        href={`/task/${task.id}`}
                                        className="text-gray-800 hover:underline"
                                    >
                                        {task.name}
                                    </Link>
                                    <div className="space-x-2">
                                        <Link
                                            href={`/task/${task.id}/edit`}
                                            className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
