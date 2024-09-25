import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Textarea } from "@headlessui/react";
import TextInput from "@/Components/TextInput";

export default function ProjectCreateDialog({
  setIsDeleteDialog,
  isDeleteDialog,
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
  });
  const submit = (e) => {
    e.preventDefault();

    post(route("project.store"));
  };

  function open() {
    setIsDeleteDialog(true);
  }

  function close() {
    setIsDeleteDialog(false);
  }
  return (
    <Dialog
      open={isDeleteDialog}
      as="div"
      className="relative z-10 focus:outline-none   "
      onClose={close}
      __demoMode
    >
      <div className="fixed inset-0 z-10  overflow-y-auto overscroll-contain">
        <div className="flex min-h-full   items-center justify-end p-4">
          <DialogPanel
            transition
            className="w-[1200px] h-[600px]  absolute top-20  left-[20%] mt-4 mr-16   rounded-xl  bg-white   border border-gray   py-6   duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-2xl flex items-center justify-between px-8 font-semibold py-3 text-center  text-primary"
            >
              New project
              <svg
                onClick={close}
                className="w-6 h-4 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </DialogTitle>
            <form
              onSubmit={submit}
              className="mx-auto flex flex-col  ml-8 mt-8 justify-center"
            >
              <div className="grid grid-cols-4  gap-x-8 px-4">
                <div className="col-span-2">
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Project name
                    </label>

                    <input
                      id="name"
                      name="name"
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      isFocused={true}
                    />

                    <InputError message={errors.name} className="mt-2" />
                  </div>

                  <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <input
                      id="description"
                      name="description"
                      className="appearance-none block h-[150px] w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                    ></input>

                    <InputError message={errors.description} className="mt-2" />
                  </div>
                </div>
                <div className="col-span-2 shadow-md shadow-gray-300 ">
                  <img
                    src="/image/create_project_image.png"
                    alt="create project"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mt-8 mr-24 ">
                <PrimaryButton
                  className="ms-4 bg-primary"
                  disabled={processing}
                >
                  Create new
                </PrimaryButton>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
