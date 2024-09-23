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
    <>
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
        Approve
      </button>
      {/* <div className="bg-red-500 w-10 h-10">{approved}</div> */}
    </>
  );
}
