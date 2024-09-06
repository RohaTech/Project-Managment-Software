import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
export default function ProjectAddField({
  setIsAddFieldOpen,
  isAddFieldOpen,
  project,
}) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    title: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route("project.additional-column.create", [project]), {
      onSuccess: () => {
        reset();
      },
    });
  };
  function open() {
    setIsAddFieldOpen(true);
  }

  function close() {
    setIsAddFieldOpen(false);
  }
  return (
    <Dialog
      open={isAddFieldOpen}
      as="div"
      className="relative z-10 focus:outline-none  "
      onClose={close}
      __demoMode
    >
      <div className="fixed inset-0 z-10  overflow-y-auto overscroll-contain">
        <div className="flex min-h-full bg-yellow-00 items-center justify-end p-4">
          <DialogPanel
            transition
            className="w-[660px]   absolute top-40  right-50 mt-16 mr-16 pb-16 backdrop-blur-2xl  rounded-xl  bg-white   border border-gray  shadow-2xl  py-6   duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-2xl flex items-center justify-between px-6 font-semibold py-3 text-center  text-primary"
            >
              Add Field
              <svg
                onClick={close}
                className="size-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </DialogTitle>

            <div className="mt-4 ">
              <div className="flex gap-x-16 border-b-2 border-gray-500">
                <h1 className="font-bold text-lg px-6">Create new</h1>
              </div>

              <form
                onSubmit={handleSubmit}
                class="px-6  mt-4 flex justify-around items-end"
              >
                <div class="mt-5">
                  <label for="title" class="block mb-2 text-sm font-medium  ">
                    Field title
                  </label>
                  <input
                    type="title"
                    id="title"
                    value={data.title}
                    onChange={(e) => {
                      setData("title", e.target.value);
                    }}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary focus:border-primary block w-[250px] p-2.5 "
                    placeholder=""
                    required
                  />
                  {errors.title && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.title}
                    </div>
                  )}
                </div>
                <div className="">
                  <label
                    for="type"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Select Type
                  </label>
                  <select
                    id="type"
                    value={data.type}
                    onChange={(e) => setData("type", e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 "
                  >
                    <option selected>Choose Field Type</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="char">Char</option>
                    <option value="boolean">Boolean</option>
                  </select>
                  {errors.type && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.type}
                    </div>
                  )}
                </div>
              </form>
              <div className="px-6 mt-16 flex justify-end gap-x-8">
                <SecondaryButton onClick={close}>Cancel</SecondaryButton>
                <PrimaryButton onClick={handleSubmit}>Create</PrimaryButton>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
