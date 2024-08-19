// src/pages/task.js

import React, { useState, useEffect } from "react";
// import axios from 'axios';

import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const Task = ({ tasks }) => {
    return (
        <GuestLayout>
            <Head title="Task List" />
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Task List</h1>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Task Name</th>
                            <th className="py-2 px-4 border-b">Assigned To</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td className="py-2 px-4 border-b">
                                    {task.name}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {task.assigned}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <Link href={route('tasks.show', task.id)}>
                                        <PrimaryButton>
                                            View Details
                                        </PrimaryButton>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GuestLayout>
    );
};

export default Task;
