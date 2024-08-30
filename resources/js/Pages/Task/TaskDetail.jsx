import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

const TaskDetail = ({ task, messages, user_id, user }) => {
    const [messageList, setMessageList] = useState(messages || []);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState({});
    const [attachmentPreview, setAttachmentPreview] = useState(null);

    //Se
    const { data, setData, post, processing, reset } = useForm({
        task_id: task.id,
        content: "",
    });

    // Ed
    const {
        data: editData,
        patch,
        setData: setEditData,
        processing: editProcessing,
        reset: resetEditData,
    } = useForm({
        content: "",
    });

    // De
    const { delete: destroy } = useForm();

    useEffect(() => {
        setMessageList(messages || []);
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("task_id", data.task_id);

        if (data.content.trim() !== "") {
            formData.append("content", data.content);
        }

        if (data.attachment) {
            formData.append("attachment", data.attachment);
            if (data.attachment) {
                setAttachmentPreview(URL.createObjectURL(data.attachment));
            } else {
                setAttachmentPreview(null);
            }
        }

        if (formData.has("content") || formData.has("attachment")) {
            post(route("messages.store"), {
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onSuccess: (response) => {
                    setMessageList((prevMessages) => [
                        ...prevMessages,
                        response.data,
                    ]);
                    reset();
                },
                onError: (error) => {
                    console.error(
                        "There was an error sending the message:",
                        error
                    );
                },
            });
        } else {
            console.error(
                "Either a message or an attachment must be provided."
            );
        }
    };

    const handleEditMessage = (messageId, content) => {
        setEditingMessageId(messageId);
        setEditData("content", content);
        setDropdownVisible({});
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
        setDropdownVisible({});
    };

    const toggleDropdown = (messageId) => {
        setDropdownVisible((prev) => ({
            ...prev,
            [messageId]: !prev[messageId],
        }));
    };

    const getUserInitials = (name) => {
        if (!name) return "NA";
        const trimmedName = name.trim().toUpperCase();
        return trimmedName.slice(0, 2);
    };

    return (
        <AuthenticatedLayout>
            <div className=" mx-auto h-screen overflow-hidden">
                <div className="flex justify-between sticky top-0 z-50 bg-gray-400 w-[100%] h-[50px] mb-0 h-full">
                    <div className="flex items-center ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="25"
                            height="25"
                            viewBox="0 0 50 50"
                            className="ml-8"
                        >
                            <path d="M 25 9 C 16.178 9 9 16.178 9 25 C 9 33.822 16.178 41 25 41 C 33.822 41 41 33.822 41 25 C 41 16.178 33.822 9 25 9 z M 25.021484 10.003906 C 33.291484 10.003906 40.021484 16.732906 40.021484 25.003906 C 40.021484 33.274906 33.292484 40.003906 25.021484 40.003906 C 16.750484 40.003906 10.021484 33.274906 10.021484 25.003906 C 10.021484 16.732906 16.750484 10.003906 25.021484 10.003906 z M 32.816406 20.642578 C 32.688406 20.642578 32.560391 20.689609 32.462891 20.787109 L 23.484375 29.765625 L 18.064453 24.347656 C 17.869453 24.152656 17.552422 24.152656 17.357422 24.347656 C 17.162422 24.542656 17.162422 24.859687 17.357422 25.054688 L 23.130859 30.826172 C 23.228859 30.923172 23.356375 30.972656 23.484375 30.972656 C 23.612375 30.972656 23.740891 30.922172 23.837891 30.826172 L 33.169922 21.494141 C 33.364922 21.299141 33.364922 20.982109 33.169922 20.787109 C 33.072422 20.689609 32.944406 20.642578 32.816406 20.642578 z"></path>
                        </svg>
                        <h1 className=" text-black font-bold p-4 ">{task.name}</h1>
                    </div>
                    <Link href={route("task.index")}>
                        <PrimaryButton className="bg-transparent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="30"
                                height="40"
                                viewBox="0 0 128 128"
                                className="hover:bg-gray-300 rounded-md text-black"
                            >
                                <path
                                    fill="#71c2ff"
                                    d="M97,124V4c0-1.7-1.3-3-3-3s-3,1.3-3,3v120c0,1.7,1.3,3,3,3S97,125.7,97,124z"
                                ></path>
                                <path
                                    fill="#444b54"
                                    d="M31.9,96.1c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l30-30c1.2-1.2,1.2-3.1,0-4.2l-30-30	c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2L59.8,64L31.9,91.9C30.7,93.1,30.7,94.9,31.9,96.1z"
                                ></path>
                            </svg>
                        </PrimaryButton>
                    </Link>
                </div>
                <div className="container mx-auto my-auto  p-4 flex flex-col h-[calc(100vh-100px)]  ">
                    <div className="  p-4 rounded-md overflow-y-auto overflow-x-hidden">
                        <div className="mb-4"></div>
                        <div className="mb-4">
                            <strong>Assigned To:</strong> {task.assigned}
                        </div>
                        <div className="mb-4">
                            <strong>Assigned To:</strong> {task.due_date}
                        </div>
                        <div className="mb-4">
                            <strong>Assigned To:</strong> {task.status}
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold">Messages</h2>
                            <div className="mb-4 mr-8">
                                {messageList.length > 0 ? (
                                    messageList.map((message, index) => (
                                        <div
                                            key={message?.id || index}
                                            className="py-2 flex justify-between items-center"
                                        >
                                            {editingMessageId ===
                                            message?.id ? (
                                                <form
                                                    onSubmit={
                                                        handleUpdateMessage
                                                    }
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
                                                            disabled={
                                                                editProcessing
                                                            }
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
                                                    <div className="flex">
                                                        <div className="ml-2 mr-2  rounded-full h-8 w-8 flex items-center justify-center text-white bg-blue-400">
                                                            {getUserInitials(
                                                                message.user
                                                                    ?.name
                                                            )}
                                                        </div>
                                                        <p className="font-bold">
                                                            {message?.content ||
                                                                "No Content"}
                                                        </p>
                                                        <span className="text-sm text-gray-600 ml-2 mt-3 font-light">
                                                            {format(
                                                                new Date(
                                                                    message.created_at
                                                                ),
                                                                "h:mm a"
                                                            )}
                                                        </span>
                                                    </div>

                                                    {message?.user_id ===
                                                        user_id && (
                                                        <div className="relative flex mt-2">
                                                            <button
                                                                onClick={() =>
                                                                    toggleDropdown(
                                                                        message?.id
                                                                    )
                                                                }
                                                                className="text-blue-500 mr-2 hover:via-blue-300"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    x="0px"
                                                                    y="0px"
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 50 50"
                                                                >
                                                                    <path
                                                                        fill="#888888"
                                                                        d="M9.781,18.278l3.188-3.188c0.781-0.781,2.047-0.781,2.828,0L25,24.292l9.202-9.202c0.781-0.781,2.047-0.781,2.828,0	l3.188,3.188c0.781,0.781,0.781,2.047,0,2.828L26.415,34.91c-0.781,0.781-2.047,0.781-2.828,0L9.782,21.107	C9,20.325,9,19.059,9.781,18.278z"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            {dropdownVisible[
                                                                message?.id
                                                            ] && (
                                                                <div className="absolute bg-white border rounded shadow-md p-4">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleEditMessage(
                                                                                message?.id,
                                                                                message?.content
                                                                            )
                                                                        }
                                                                        className="block text-primary hover:text-blue-700 hover:bg-gray"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteMessage(
                                                                                message?.id
                                                                            )
                                                                        }
                                                                        className="block text-red-500 hover:text-red-700"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
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
                        </div>
                    </div>

                    <form
                        onSubmit={handleSendMessage}
                        className="flex flex-col  sticky bottom-0 bg-white p-4 rounded-t-md"
                    >
                        <div className="flex">
                            <div className="ml-2 mr-2  bg-blue-400 rounded-full h-8 w-8 flex items-center justify-center text-white ">
                                {getUserInitials(user.name)}
                            </div>
                            <div className="flex-row border-[2px] rounded-[4px] bg-slate-200 w-full">
                                <div className="flex">
                                    <textarea
                                        value={data.content || ""} // Provide a default value
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                        className="border-none outline-none focus:border-transparent focus:outline-none p-2 flex-grow bg-transparent"
                                        placeholder="Write a message..."
                                        rows="1"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <input
                                        id="fileInput"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) =>
                                            setData(
                                                "attachment",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                    <label
                                        className="ml-2 mt-1"
                                        htmlFor="fileInput"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 48 48"
                                            className="mt-3"
                                        >
                                            <path
                                                fill="#3dd9eb"
                                                d="M44.364,6.636c-3.51-3.508-9.219-3.508-12.729,0l-14,14l2.828,2.828l14-14	c1.949-1.949,5.123-1.949,7.072,0c1.949,1.95,1.949,5.122,0.002,7.069L27.519,30.519l2.828,2.828l14.017-13.983	C47.873,15.855,47.873,10.145,44.364,6.636z"
                                            ></path>
                                            <rect
                                                width="16.971"
                                                height="4"
                                                x="11.59"
                                                y="9.075"
                                                fill="#3dd9eb"
                                                transform="rotate(-45.001 20.075 11.076)"
                                            ></rect>
                                            <rect
                                                width="16.971"
                                                height="4"
                                                x="21.515"
                                                y="19"
                                                fill="#3dd9eb"
                                                transform="rotate(-45.001 30 21)"
                                            ></rect>
                                            <path
                                                fill="#00b3d7"
                                                d="M14.5,44c3.339,0,6.478-1.3,8.837-3.659l8.512-8.492l-2.828-2.828l-8.51,8.49	C18.905,39.116,16.771,40,14.5,40s-4.405-0.884-6.011-2.489c-3.314-3.314-3.314-8.707,0-12.021l8.5-8.5l-2.828-2.828l-8.5,8.5	c-4.874,4.874-4.874,12.804,0,17.678C8.022,42.7,11.161,44,14.5,44z"
                                            ></path>
                                            <path
                                                fill="#00b3d7"
                                                d="M21.964,21.964l-2.828-2.828l-8.525,8.525C9.572,28.7,9,30.081,9,31.55	c0,1.469,0.572,2.85,1.611,3.89c1.039,1.039,2.42,1.61,3.889,1.61c1.47,0,2.851-0.572,3.889-1.611l8.525-8.525l-2.828-2.828	l-8.525,8.525c-0.566,0.566-1.555,0.566-2.121,0C13.156,32.328,13,31.951,13,31.55c0-0.401,0.156-0.777,0.439-1.061L21.964,21.964z"
                                            ></path>
                                        </svg>
                                    </label>
                                    {attachmentPreview && (
                                        <div className="mt-2">
                                            <img
                                                src={attachmentPreview}
                                                alt="Preview"
                                                className="h-16"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setAttachmentPreview(null);
                                                    setData("attachment", null);
                                                }}
                                                className="ml-2 text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500  mb-1 mr-1 text-white p-1 mt-2 w-[70px] h-[25px] pb-[30px] rounded-md"
                                    >
                                        {processing ? "Sending..." : "Send"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TaskDetail;
