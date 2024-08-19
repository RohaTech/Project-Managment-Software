import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from 'axios';

const TaskDetail = ({ task, messages,user_id }) => {
    const [messageList, setMessageList] = useState(messages || []);
    const { data, setData, post, processing, reset } = useForm({
        task_id: task.id,
        content: '', // Ensure this is initialized
    });

    useEffect(() => {
        setMessageList(messages || []);
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();

        post(route('messages.store'), {
            onSuccess: (response) => {
                setMessageList([...messageList, response.data]);
                reset();
            },
            onError: (error) => {
                console.error('There was an error sending the message:', error);
            }
        });
    };

    const handleDeleteMessage = (messageId) => {
        axios.delete(route('messages.destroy', messageId))
            .then(() => {
                setMessageList(messageList.filter(message => message.id !== messageId));
            })
            .catch(error => {
                console.error('There was an error deleting the message:', error);
            });
    };

    return (
        <GuestLayout>
            <Head title={`Task Detail - ${task.name}`} />
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Task Details</h1>
                <div className="mb-4">
                    <strong>Task Name:</strong> {task.name}
                </div>
                <div className="mb-4">
                    <strong>Assigned To:</strong> {task.assigned}
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <div className="mb-4">
                        {messageList.length > 0 ? (
                            messageList.map((message, index) => (
                                // Ensure message is defined and has content
                                message && message.content !== undefined ? (
                                    <div key={message.id || index} className="border-b py-2">
                                        <p>{message.content || 'No Content'}</p>
                                        {message.user_id === user_id && (
                                            <button
                                                onClick={() => handleDeleteMessage(message.id)}
                                                className="text-red-500"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div key={index} className="border-b py-2">
                                        <p>Message content not available</p>
                                    </div>
                                )
                            ))
                        ) : (
                            <p>No messages yet.</p>
                        )}
                    </div>
                    <form onSubmit={handleSendMessage} className="flex">
                        <textarea
                            value={data.content || ''} // Provide a default value
                            onChange={(e) => setData('content', e.target.value)}
                            className="border p-2 flex-grow"
                            placeholder="Write a message..."
                            rows="3"
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white p-2 ml-2"
                        >
                            {processing ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
                <Link href={route('tasks.index')}>
                    <PrimaryButton>Back to Task List</PrimaryButton>
                </Link>
            </div>
        </GuestLayout>
    );
};

export default TaskDetail;
