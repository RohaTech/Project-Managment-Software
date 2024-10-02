import { useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@headlessui/react";
import Project from "@/Pages/Project/ProjectCreate";

export default function ProjectShowCopyDialog({
  setIsCopyOpen,
  isCopyOpen,
  project,
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
  });

  const deleteProject = (e) => {
    e.preventDefault();
    post(route("project.copy.store", [project]), {
      onSuccess: () => setIsCopyOpen(false),
    });
  };
  function open() {
    setIsCopyOpen(true);
  }

  function close() {
    setIsCopyOpen(false);
  }
  return (
    <Dialog
      open={isCopyOpen}
      onClose={() => setIsCopyOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
        <DialogPanel className="max-w-2xl space-y-4 bg-slate-200 p-8 rounded-lg shadow-lg w-[500px]">
          <DialogTitle className="text-lg font-medium text-gray-900 capitalize">
            Are you sure you want to Duplicate Project
            <span className="text-xl font-bold text-primary   ml-1">
              {project?.name}
            </span>
          </DialogTitle>
          <form className="space-y-6 w-2xl">
            <div className="flex gap-x-5 items-center justify-end mt-6">
              <PrimaryButton
                onClick={() => {
                  setIsCopyOpen(false);
                }}
                className="  text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                disabled={processing}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton
                onClick={deleteProject}
                className={`bg-primary  text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out `}
                disabled={processing}
              >
                duplicate
              </PrimaryButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
