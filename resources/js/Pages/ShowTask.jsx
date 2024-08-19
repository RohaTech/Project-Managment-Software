import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShowTask({ task }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Details</h2>}
        >
            <Head title={task.name} />
            {console.log(task)}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
            <a href='/task' className="px-4 py-2 border border-black rounded-lg no-underline">Back</a>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{task.name}</h3>
                        <div className="text-gray-700 mb-4">
                            <p><strong>Status:</strong> {task.status}</p>
                            <p><strong>Priority:</strong> {task.priority}</p>
                            <p><strong>Due Date:</strong> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date set'}</p>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-4">Project Details</h3>
                        <p><strong>Project Name:</strong> {task.project.name}</p>
                        <p><strong>Project Description:</strong> {task.project.description}</p>

                        <div className="flex space-x-4">
                            <Link
                                href={`/task/${task.id}/edit`}
                                className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Edit
                            </Link>
                            <Link
                                href="#"
                                className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                            >
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
