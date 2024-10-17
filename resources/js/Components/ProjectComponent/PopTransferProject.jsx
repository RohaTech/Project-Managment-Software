import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Textarea } from "@headlessui/react";
function PopTransferProject({
  openTransfer,
  setOpenTransfer,
  project,
  members,
}) {
  const [openConfirmTransfer, setOpenConfirmTransfer] = useState(false);
  const { data, setData, patch, processing, errors, reset } = useForm({
    member_id: "",
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("project-members.transfer", [project]));
    setOpenTransfer(false);
    setOpenConfirmTransfer(false);
  };

  const filteredMembers = members.filter((member) => member.role !== "owner");

  return (
    <>
      <Dialog
        open={openTransfer}
        onClose={() => setOpenTransfer(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
          <DialogPanel className="max-w-2xl space-y-4 bg-white p-8 rounded-lg shadow-lg w-[500px]">
            <DialogTitle className="text-xl font-bold text-danger">
              Transfer Ownership
            </DialogTitle>
            <form className="space-y-6 w-2xl">
              <div>
                <h1 className="my-2 text-gray-800 ml-1">
                  Choose Member To Transfer
                </h1>
                <select
                  name="member"
                  className="border border-gray-200 rounded-sm"
                  onChange={(e) => {
                    setData("member_id", e.target.value);
                  }}
                >
                  <option value="">Choose Member</option>
                  {filteredMembers.map((member, index) => {
                    return (
                      <option key={index} value={member.id}>
                        {member.name.split(" ")[0]}
                      </option>
                    );
                  })}
                  {/* <option value={null}>Not Assigned</option> */}
                </select>
              </div>
              <div className="flex gap-x-5 items-center justify-end mt-6">
                <PrimaryButton
                  onClick={(e) => {
                    e.preventDefault();
                    if (data.member_id) {
                      setOpenConfirmTransfer(true);
                    }
                  }}
                  className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                  disabled={processing}
                >
                  Transfer Project
                </PrimaryButton>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
      <Dialog
        open={openConfirmTransfer}
        onClose={(e) => {
          e.preventDefault();
          setOpenConfirmTransfer(false);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
          <DialogPanel className="max-w-2xl space-y-4 bg-slate-200 p-8 rounded-lg shadow-lg w-[500px]">
            <DialogTitle className="text-xl font-bold text-gray-800">
              <h2 className="text-lg font-medium text-gray-900 uppercase">
                Are you sure you want to Transfer this Project
              </h2>
              <h2 className="text-red-500 mt-1 text-sm">
                This action cannot be reversed.
              </h2>
            </DialogTitle>
            <form className="space-y-6 w-2xl">
              <div className="flex gap-x-5 items-center justify-end mt-6">
                <PrimaryButton
                  onClick={() => {
                    setOpenConfirmTransfer(false);
                  }}
                  className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                  disabled={processing}
                >
                  Cancel
                </PrimaryButton>
                <PrimaryButton
                  onClick={submit}
                  className={`bg-red-500  text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out `}
                  disabled={processing}
                >
                  Transfer
                </PrimaryButton>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default PopTransferProject;
