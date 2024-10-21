import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function MembersDeleteDialog({
  setIsMembersDeleteDialogOpen,
  isMembersDeleteDialogOpen,
  project,
  member,
}) {
  const {
    data,
    setData,
    delete: destroy,
    processing,
    errors,
    reset,
  } = useForm({
    user_id: "",
  });

  //   console.log(member);

  const handleSubmit = (e) => {
    console.log("object");
    e.preventDefault();
    setData("user_id", member?.id);
    destroy(route("project-members.destroy", [project]), {
      onSuccess: (response) => {
        reset();
        close();
      },
    });
  };

  function open() {
    setIsMembersDeleteDialogOpen(true);
  }

  function close() {
    setIsMembersDeleteDialogOpen(false);
  }

  return (
    <Dialog
      open={isMembersDeleteDialogOpen}
      as="div"
      className="relative z-10 focus:outline-none  "
      onClose={close}
      __demoMode
    >
      <div className="fixed inset-0 z-10  overflow-y-auto overscroll-contain">
        <div className="flex min-h-full  items-center justify-end p-4">
          <DialogPanel
            transition
            className="w-[500px]   absolute top-30  right-0 mt-16 mr-16   rounded-xl  bg-white   border border-gray   py-6   duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-2xl flex items-center justify-between px-6 font-semibold py-3 text-center  text-primary"
            >
              Confirm User Removal
            </DialogTitle>
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Are you sure you want to remove this user from the project
              </h2>
              <h4 className="text-red-500 mt-4">
                {" "}
                This action cannot be reversed.
              </h4>

              <div className="mt-6 flex ">
                <SecondaryButton onClick={close}>Cancel</SecondaryButton>

                <PrimaryButton
                  className="ms-3 bg-red-500"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Remove The User
                </PrimaryButton>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
