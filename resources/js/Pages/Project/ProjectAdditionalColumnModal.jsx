import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";

export default function ProjectAdditionalColumnModal({
  setConfirmingUserDeletion,
  confirmingUserDeletion,
  project,
  deleteTitle,
  additional_column,
  setIsDeleting,
}) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    title: deleteTitle || "",
  });

  const handlePatch = (e) => {
    e.preventDefault();

    patch(
      route("project.additional-column.delete", [project], {
        onSuccess: () => {
          close();
        },
      })
    );

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  function open() {
    setConfirmingUserDeletion(true);
  }

  function close() {
    setConfirmingUserDeletion(false);
  }
  useEffect(() => {
    setData("title", deleteTitle);
  }, [deleteTitle]);

  return (
    <Dialog
      open={confirmingUserDeletion}
      as="div"
      className="relative z-10 focus:outline-none  "
      onClose={close}
      __demoMode
    >
      <div className="fixed inset-0 z-10  overflow-y-auto overscroll-contain">
        <div className="flex min-h-full  items-center justify-end p-4">
          <DialogPanel
            transition
            className="w-[500px]   absolute top-40  right-50 mt-16 mr-16   rounded-xl  bg-white   border border-gray   py-6   duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-2xl flex items-center justify-between px-6 font-semibold py-3 text-center  text-primary"
            >
              Delete Column
            </DialogTitle>
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Are you sure you want to delete the column?
              </h2>

              <div className="mt-6 flex ">
                <SecondaryButton onClick={close}>Cancel</SecondaryButton>

                <PrimaryButton
                  className="ms-3 bg-red-500"
                  disabled={processing}
                  onClick={(e) => {
                    setData("title", deleteTitle);
                    handlePatch(e);
                  }}
                >
                  Delete The column
                </PrimaryButton>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
