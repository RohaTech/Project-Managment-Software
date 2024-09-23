import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Menu } from "@headlessui/react";

const Message = ({ project, messages, user_id, user }) => {
    const [messageList, setMessageList] = useState(messages || []);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState({});
    const [attachmentPreview, setAttachmentPreview] = useState(null);
    const serverUrl = " http://localhost:8001/storage/";

    //   const serverUrl = " http://127.0.0.1:8001/storage/";

    //Se0
    const { data, setData, post, processing, reset } = useForm({
        project_id: project.id,
        content: "",
    });

    // const userAssigned = assigned[0];

    // Ed
    const {
        data: editData,
        patch,
        setData: setEditData,
        processing: editProcessing,
        reset: resetEditData,
    } = useForm({
        project_id: "",
        content: "",
    });
    // const [messageContent, setMessageContent] = useState(date/)
    // De
    const { delete: destroy } = useForm();

    useEffect(() => {
        setMessageList(messages || []);
    }, [messages]);
    const handleSendMessage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("project_id", data.project_id);

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
            post(
                route("projectMessages.store", { projectId: data.project_id }),
                {
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
                }
            );
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
            // {
            // onSuccess: (response) => {
            // console.log(response);
            // setMessageList(response.props.messages);
            // setEditData("content", editData.content);
            // console.log(response);
            // }
            // },
        });
        setEditingMessageId(null);
    };

    const handleDeleteMessage = (messageId) => {
        if (confirm("Are you sure you want to delete this message?")) {
            destroy(route("messages.destroy", messageId), {
                onSuccess: (response) => {
                    setMessageList(response.props.messages);
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
                <div className="flex justify-between sticky top-0 z-50 border-b w-[100%] h-[80px] mb-0 ">
                    {" "}
                    <div>
                        <div className="flex flex-raw gap-1 justify-center content-center items-center">
                            <img
                                width="26"
                                height="26"
                                src="https://img.icons8.com/fluency/48/dashboard-layout.png"
                                alt="dashboard-layout"
                            />
                            <p className=" text-gray-400 mb-2 mt-2 text-xl">
                                {project.name}
                            </p>
                        </div>
                        <p className="text-2xl">Board Discussion</p>
                    </div>
                    <PrimaryButton
                        onClick={() => window.history.back()}
                        className="bg-transparent"
                    >
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
                </div>
                <div className="container mx-auto my-auto  p-4 flex flex-col h-[calc(100vh-100px)]  ">
                    <div className="  p-4 rounded-md overflow-y-auto overflow-x-hidden">
                        <div className="mb-6">
                            <div className="">
                                <div className="mb-4 mr-8">
                                    {messageList.length > 0 ? (
                                        messageList.map((message, index) => (
                                            <div
                                                key={message?.id || index}
                                                className="py-2 flex justify-end items-center"
                                            >
                                                {editingMessageId ===
                                                message?.id ? (
                                                    <form
                                                        onSubmit={
                                                            handleUpdateMessage
                                                        }
                                                        className="flex flex-col justify-end  "
                                                    >
                                                        <textarea
                                                            value={
                                                                editData.content
                                                            }
                                                            onChange={(e) =>
                                                                setEditData(
                                                                    "content",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="border p-2 flex-grow rounded-lg"
                                                            placeholder="Edit message..."
                                                            rows="2"
                                                        />
                                                        <div className="mt-2 flex">
                                                            <button
                                                                type="submit"
                                                                disabled={
                                                                    editProcessing
                                                                }
                                                                className="bg-green-500 rounded-xl h-8 w-15  text-white  mr-2 text-sm"
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
                                                                className="bg-gray-500  rounded-xl h-8 w-15 text-white  text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <div
                                                        className={`w-full flex ${
                                                            message?.user_id ===
                                                            user_id
                                                                ? "justify-end"
                                                                : "justify-start"
                                                        }`}
                                                    >
                                                        {message?.user_id ===
                                                            user_id && (
                                                                <div className="relative flex mt-2 bg-red-600 mr-8 justify-center items-center mb-2">
                                                                {message?.id && (  
                                                                    <div className="absolute mt-10 ml-6 bg-transparent border-none border rounded  p-4">
                                                                        <Menu
                                                                            as="div"
                                                                            className="mb-10 relative inline-block text-left "
                                                                        >
                                                                            <Menu.Button className="text-blue-500 mr-2 hover:bg-gray-200 rounded-md p-2">
                                                                                <svg
                                                                               
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    x="0px"
                                                                                    y="0px"
                                                                                    width="20"
                                                                                    height="20"
                                                                                    viewBox="0 0 30 30"
                                                                                >
                                                                                    <path  fill="gray" d="M3,12v-2c0-0.386,0.223-0.738,0.572-0.904s0.762-0.115,1.062,0.13L15,17.708l10.367-8.482 c0.299-0.245,0.712-0.295,1.062-0.13C26.779,9.261,27,9.614,27,10v2c0,0.3-0.135,0.584-0.367,0.774l-11,9 c-0.369,0.301-0.898,0.301-1.267,0l-11-9C3.135,12.584,3,12.3,3,12z"></path>
                                                                                </svg>
                                                                            </Menu.Button>

                                                                            <Menu.Items
                                                                                as="div"
                                                                                className="absolute bg-white border rounded shadow-lg mt-2 p-2 z-50 w-40"
                                                                            >
                                                                                {/* Edit option */}
                                                                                <Menu.Item as="div">
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                handleEditMessage(
                                                                                                    message?.id,
                                                                                                    message?.content
                                                                                                )
                                                                                            }
                                                                                            className={`${
                                                                                                active
                                                                                                    ? "bg-gray-200"
                                                                                                    : ""
                                                                                            } block w-full text-left px-4 py-2 text-blue-500`}
                                                                                        >
                                                                                            Edit
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>

                                                                                {/* Delete option */}
                                                                                <Menu.Item as="div">
                                                                                    {({
                                                                                        active,
                                                                                    }) => (
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                handleDeleteMessage(
                                                                                                    message?.id
                                                                                                )
                                                                                            }
                                                                                            className={`${
                                                                                                active
                                                                                                    ? "bg-gray-200"
                                                                                                    : ""
                                                                                            } block w-full text-left px-4 py-2 text-red-500`}
                                                                                        >
                                                                                            Delete
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </Menu.Items>
                                                                        </Menu>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col gap-0 align-middle items-center">
                                                            <div className="flex">
                                                                {message?.user_id !==
                                                                user_id ? (
                                                                    <div className="ml-2 mr-2 rounded-full h-8 w-8 flex items-center justify-center text-white bg-blue-400">
                                                                        {getUserInitials(
                                                                            message
                                                                                ?.user
                                                                                ?.name
                                                                        )}
                                                                    </div>
                                                                ) : null}

                                                                {message?.content && (
                                                                    <div className="flex bg-blue-400  rounded-2xl p-2">
                                                                        <p className="font-bold">
                                                                            {message?.content ||
                                                                                null}
                                                                        </p>
                                                                        {message &&
                                                                            message.created_at && (
                                                                                <span className="text-sm text-gray-100 ml-2 mt-3 font-light">
                                                                                    {format(
                                                                                        new Date(
                                                                                            message.created_at
                                                                                        ),
                                                                                        "h:mm a"
                                                                                    )}
                                                                                </span>
                                                                            )}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {message?.attachments &&
                                                                message
                                                                    .attachments
                                                                    .length >
                                                                    0 && (
                                                                    <div className="attachments mt-2">
                                                                        {message.attachments.map(
                                                                            (
                                                                                attachment
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        attachment.id
                                                                                    }
                                                                                    className="attachment-item mt-1"
                                                                                >
                                                                                    <a
                                                                                        href={
                                                                                            serverUrl +
                                                                                            attachment.file_path
                                                                                        }
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                    >
                                                                                        {/* Check if the file is an image */}
                                                                                        {serverUrl +
                                                                                        attachment.file_path.match(
                                                                                            /\.(jpeg|jpg|gif|png)$/
                                                                                        ) ? (
                                                                                            <div className="flex flex-col  items-end">
                                                                                                <img
                                                                                                    src={
                                                                                                        serverUrl +
                                                                                                        attachment.file_path
                                                                                                    }
                                                                                                    alt={
                                                                                                        attachment.file_name
                                                                                                    }
                                                                                                    className="w-50 h-40 object-cover rounded"
                                                                                                />
                                                                                                {!message.content && (
                                                                                                    <span className="text-sm text-gray-600  ml-2 mt-3 font-light rounded-xl  ">
                                                                                                        {format(
                                                                                                            new Date(
                                                                                                                message.created_at
                                                                                                            ),
                                                                                                            "h:mm a"
                                                                                                        )}
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="text-sm  text-blue-500 underline flex flex-col gap-0">
                                                                                                <img
                                                                                                    width="100"
                                                                                                    height="100"
                                                                                                    src="https://img.icons8.com/color/48/file.png"
                                                                                                    alt="file"
                                                                                                />
                                                                                                <span className="text-sm text-gray-500"></span>
                                                                                                {
                                                                                                    attachment.file_name
                                                                                                }
                                                                                            </div>
                                                                                        )}
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full flex flex-col justify-center items-center">
                                            <img
                                                width="260"
                                                height="200"
                                                src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
                                                alt="external-discussion-home-office-photo3ideastudio-gradient-photo3ideastudio"
                                            />
                                            <div className="w-full flex flex-col gap-2 items-center justify-center">
                                                <p className="text-xl font-medium">
                                                    No discussion on this board
                                                    yet
                                                </p>
                                                <p className="font-normal w-[40%]  text-gray-500 text-center">
                                                    Be the first one to start a
                                                    discussion with all board
                                                    members. all members'll this
                                                    project be notified.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
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

export default Message;
