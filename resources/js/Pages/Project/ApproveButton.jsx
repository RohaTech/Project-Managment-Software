import React from "react";
import { useForm } from "@inertiajs/react";

export default function ApproveButton({ ApproveData, task }) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    approve: "",
  });
  const approve = () => {
    setData("approve", 1);
    patch(route("task.approve", [task]));
  };
  return (
    <button
      onClick={approve}
      class={`${
        ApproveData.approved || ApproveData.status === "Not Started"
          ? "hidden"
          : ""
      }`}
    >
      Approve
    </button>
  );
}
