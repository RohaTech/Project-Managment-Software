import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export default function ApproveButton({ ApproveData, task }) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    approve: "",
  });

  const [approved, setApproved] = useState(ApproveData.approved);

  useEffect(() => {
    console.log(approved);
  }, [approved]);

  const approve = () => {
    setData("approve", 1);
    patch(route("task.approve", [task]), {
      onSuccess: (response) => {
        const filterdtask = response.props.tasks.filter(
          (item) => item.id === task.id
        );

        setApproved(filterdtask.approved);
      },
    });
  };
  return (
    <button
      onClick={approve}
      class={`${
        approved || ApproveData.status === "Not Started" ? "hidden" : ""
      }`}
    >
      Approve
    </button>
  );
}
