import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Textarea } from "@headlessui/react";

export default function ProjectEdit({ project_id }) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    name: "",
    description: "",
  });
  const submit = (e) => {
    e.preventDefault();

    patch(route("project.update", [project_id]));
  };
  console.log(project_id);
  return (
    <AuthenticatedLayout>
      <div className="mx-auto max-w-[720px] mt-24">
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="name" value="Project Title" />

            <TextInput
              id="name"
              name="name"
              className="mt-1 block w-[450px]"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              isFocused={true}
            />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="description" value="Description" />

            <Textarea
              id="description"
              name="description"
              className="mt-1 block w-[450px]"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
            />

            <InputError message={errors.description} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ms-4" disabled={processing}>
              Post
            </PrimaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
