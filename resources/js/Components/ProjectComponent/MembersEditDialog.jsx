import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
export default function MembersEditDialog({
  setIsMembersEditDialogOpen,
  isMembersEditDialogOpen,
  project,
  setProjectColumn,
  projectColumn,
  member,
}) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    role: "",
    user_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setData("user_id", member?.id);
    patch(route("project-members.update", [project]), {
      onSuccess: (response) => {
        reset();
        close();
      },
    });
  };
  function open() {
    setIsMembersEditDialogOpen(true);
  }

  function close() {
    setIsMembersEditDialogOpen(false);
  }
  return (
    <Dialog
      open={isMembersEditDialogOpen}
      as="div"
      className="relative z-10 focus:outline-none  "
      onClose={close}
      __demoMode
    >
      <div className="fixed inset-0 z-10  overflow-y-auto overscroll-contain">
        <div className="flex min-h-full bg-yellow-00 items-center  p-4">
          <DialogPanel
            transition
            className="w-[400px]   absolute top-30  right-0 mt-16 mr-16  backdrop-blur-2xl  rounded-xl  bg-white   border border-gray  shadow-2xl  py-6   duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-2xl flex items-center justify-between px-6 font-semibold py-3 text-center  text-primary"
            >
              Edit The Role
              <svg
                onClick={close}
                className="size-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </DialogTitle>

            <div className="mt-4  ">
              <form onSubmit={handleSubmit} className="px-6  mt-4 ">
                <div className="">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Select Role
                  </label>
                  <select
                    id="role"
                    value={data.role}
                    onChange={(e) => {
                      setData("role", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 "
                  >
                    <option defaultValue>Choose Role</option>
                    <option hidden={member?.role == "member"} value="member">
                      Member
                    </option>
                    <option hidden={member?.role == "admin"} value="admin">
                      Admin
                    </option>
                  </select>
                  {errors.role && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.role}
                    </div>
                  )}
                </div>
              </form>
              <div className="px-6 mt-4 flex justify-end gap-x-8">
                <SecondaryButton onClick={close}>Cancel</SecondaryButton>
                <PrimaryButton onClick={handleSubmit} className="bg-primary">
                  Set Role
                </PrimaryButton>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
