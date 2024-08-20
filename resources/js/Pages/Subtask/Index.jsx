import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ subtasks }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this subtask?')) {
            destroy(route('subtask.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subtasks</h2>}
        >
            <Head title="Subtasks" />

            <div className="mx-16">
                <div className="flex my-4">
                    <Link href={route('subtask.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Subtask
                    </Link>
                </div>
                <div>
                    {subtasks.map((subtask) => (
                        <ul className="flex justify-between items-center border p-2" key={subtask.id}>
                            <li className="flex-1">
                                <Link href={route('subtask.show', subtask.id)} className="text-blue-500 hover:underline">
                                    {subtask.name}
                                </Link>
                            </li>
                            <li className="flex space-x-2">
                                <Link
                                    href={route('subtask.edit', subtask.id)}
                                    className="px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(subtask.id)}
                                    className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
