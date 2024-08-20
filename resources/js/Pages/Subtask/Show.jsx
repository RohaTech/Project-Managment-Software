import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ subtask }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Details</h2>}
        >
            <Head title={subtask.name} />
            {console.log(subtask)}
            <div>{subtask.name}</div>

        </AuthenticatedLayout>
    );
}
