import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export default function ApproveButton({ ApproveData, task }) {
  const [approved, setApproved] = useState(task.approved);
  const { data, setData, patch, processing, errors, reset } = useForm({
    approve: approved,
  });

  const approve = (e) => {
    setData("approve", 1);
    patch(route("task.approve", [task]), {});
  };
  //   console.log(ApproveData);

  return (
    <div
      className={`group -top-2 z-99 cursor-pointer items-center gap-x-1  left-2 absolute flex ${
        approved ||
        ApproveData.status === "Not Started" ||
        ApproveData.status === null
          ? "hidden"
          : ""
      }`}
    >
      <svg
        className={`fill-primaryColor group size-5 `}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
      </svg>
      <button
        onClick={(e) => {
          setApproved(true);
          approve(e);
        }}
        className={`${
          approved ||
          ApproveData.status === "Not Started" ||
          ApproveData.status === null
            ? "hidden"
            : ""
        }`}
      >
        <h3 className="group-hover:inline shadow-md hidden p-1 bg-primaryColor text-nowrap rounded text-white text-sm">
          Approve
        </h3>
      </button>
    </div>
  );
}
