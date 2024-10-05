import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@headlessui/react";

function PopEditProject({ openEdit, setOpenEdit, project, role }) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    name: project.name,
    description: project.description,
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route("project.update", [project.id]));
    setOpenEdit(false); // Close the dialog after submission
  };

  return (
    <Dialog
      open={openEdit}
      onClose={() => setOpenEdit(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
        <DialogPanel className="max-w-2xl space-y-4 bg-slate-200 p-8 rounded-lg shadow-lg w-[500px]">
          <DialogTitle className="text-xl font-bold text-gray-800">
            Edit Project
          </DialogTitle>
          <form className="space-y-6 w-2xl">
            <div>
              <InputLabel
                htmlFor="name"
                value="Project Title"
                className="text-gray-700 font-bold"
              />
              <TextInput
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 bg-slate-200 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                isFocused={true}
              />
              <InputError message={errors.name} className="mt-2 text-red-600" />
            </div>

            <div className="mt-4">
              <InputLabel
                htmlFor="description"
                value="Description"
                className="text-gray-700"
              />
              <Textarea
                id="description"
                name="description"
                className="mt-1 block w-full rounded-md border-gray-300 bg-slate-200 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
              <InputError
                message={errors.description}
                className="mt-2 text-red-600"
              />
            </div>

            <div className="flex gap-x-5 items-center justify-end mt-6">
              <PrimaryButton
                onClick={submit}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                disabled={processing}
              >
                Save
              </PrimaryButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default PopEditProject;
