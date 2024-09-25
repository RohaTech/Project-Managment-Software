import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@headlessui/react";

export default function ProjectDeletePop({
  setOpenDelete,
  openDelete,
  project,
}) {
  const {
    data,
    setData,
    delete: destroy,
    processing,
    errors,
    reset,
  } = useForm({
    name: project.name,
    description: project.description,
  });

  const deleteProject = (e) => {
    e.preventDefault();
    destroy(route("project.delete", [project]), {
      onSuccess: () => setOpenDelete(false),
    });
  };
  function open() {
    setOpenDelete(true);
  }

  function close() {
    setOpenDelete(false);
  }
  return (
    <Dialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
        <DialogPanel className="max-w-2xl space-y-4 bg-slate-200 p-8 rounded-lg shadow-lg w-[500px]">
          <DialogTitle className="text-xl font-bold text-gray-800">
            <h2 className="text-lg font-medium text-gray-900 uppercase">
              Are you sure you want to Delete Project
            </h2>
            <h4 className="text-red-500 mt-1 text-sm">
              This action cannot be reversed.
            </h4>
          </DialogTitle>
          <form className="space-y-6 w-2xl">
            <div className="flex gap-x-5 items-center justify-end mt-6">
              <PrimaryButton
                onClick={() => {
                  setOpenDelete(false);
                }}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                disabled={processing}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton
                onClick={deleteProject}
                className={`bg-red-500  text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out `}
                disabled={processing}
              >
                delete
              </PrimaryButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
