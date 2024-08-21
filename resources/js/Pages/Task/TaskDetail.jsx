import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";  // Import usePage from @inertiajs/react
import PrimaryButton from "@/Components/PrimaryButton";

const TaskDetail = ({ task, messages, user_id }) => {
    const [messageList, setMessageList] = useState(messages || []);
    const [editingMessageId, setEditingMessageId] = useState(null);

    // For sending new messages
    const { data, setData, post, processing, reset } = useForm({
        task_id: task.id,
        content: "",
    });

    // For editing existing messages
    const {
        data: editData,
        patch,
        setData: setEditData,
        processing: editProcessing,
        reset: resetEditData,
    } = useForm({
        content: "",
    });

    // deleting
    const { delete: destroy } = useForm();

    useEffect(() => {
        setMessageList(messages || []);
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        post(route("messages.store"), {
            onSuccess: (response) => {
                setMessageList((prevMessages) => [...prevMessages, response.data]);
                reset();
            },
            onError: (error) => {
                console.error("There was an error sending the message:", error);
            },
        });
    };

    const handleEditMessage = (messageId, content) => {
        setEditingMessageId(messageId);
        setEditData("content", content); // Populate form with the existing message content
    };

    const handleUpdateMessage = (e) => {
        e.preventDefault();
        patch(route("messages.update", editingMessageId), {
            content: editData.content,
        })
            .then((response) => {
                const updatedMessageList = messageList.map((message) =>
                    message?.id === editingMessageId ? response.data : message
                );
                setMessageList(updatedMessageList);
                setEditingMessageId(null);
                resetEditData();
                // Reload page using window.location.reload()
                window.location.reload();
            })
            .catch((error) => {
                console.error(
                    "There was an error updating the message:",
                    error
                );
            });
    };

    const handleDeleteMessage = (messageId) => {
        if (confirm("Are you sure you want to delete this message?")) {
            destroy(route("messages.destroy", messageId), {
                onSuccess: () => {
                    // Reload page using window.location.reload()
                    window.location.reload();
                },
                onError: (error) => {
                    console.error(
                        "There was an error deleting the message:",
                        error
                    );
                },
            });
        }
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
                                <div
                                    key={message?.id || index}
                                    className="border-b py-2"
                                >
                                    {editingMessageId === message?.id ? (
                                        <form
                                            onSubmit={handleUpdateMessage}
                                            className="flex flex-col"
                                        >
                                            <textarea
                                                value={editData.content}
                                                onChange={(e) =>
                                                    setEditData(
                                                        "content",
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-2 flex-grow"
                                                placeholder="Edit message..."
                                                rows="3"
                                            />
                                            <div className="mt-2 flex">
                                                <button
                                                    type="submit"
                                                    disabled={editProcessing}
                                                    className="bg-green-500 text-white p-2 mr-2"
                                                >
                                                    {editProcessing
                                                        ? "Updating..."
                                                        : "Update"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingMessageId(
                                                            null
                                                        );
                                                        resetEditData();
                                                    }}
                                                    className="bg-gray-500 text-white p-2"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <p>
                                                {message?.content || "No Content"}
                                            </p>
                                            {message?.user_id === user_id && (
                                                <div className="flex mt-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditMessage(
                                                                message?.id,
                                                                message?.content
                                                            )
                                                        }
                                                        className="text-blue-500 mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteMessage(
                                                                message?.id
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No messages yet.</p>
                        )}
                    </div>
                    <form onSubmit={handleSendMessage} className="flex">
                        <textarea
                            value={data.content || ""} // Provide a default value
                            onChange={(e) => setData("content", e.target.value)}
                            className="border p-2 flex-grow"
                            placeholder="Write a message..."
                            rows="3"
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white p-2 ml-2"
                        >
                            {processing ? "Sending..." : "Send"}
                        </button>
                    </form>
                </div>
                <Link href={route("task.index")}>
                    <PrimaryButton>Back to Task List</PrimaryButton>
                </Link>
            </div>
        </GuestLayout>
    );
};

export default TaskDetail;
