import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ProjectMemberRegistration() {
  const { data, setData, post, processing, errors, reset } = useForm({
    project_id: "",
    created_by: "",
  });

  // Handle form submission
  const submit = (e) => {
    e.preventDefault();

    post(route("project-members.store"), {
      onFinish: () => reset(),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register Project Member" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="project_id" value="Project" />

          <TextInput
            id="project_id"
            name="project_id"
            value={data.project_id}
            className="mt-1 block w-full"
            autoComplete="project_id"
            onChange={(e) => setData("project_id", e.target.value)}
            required
          />

          <InputError message={errors.project_id} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="created_by" value="Created By" />

          <TextInput
            id="created_by"
            name="created_by"
            value={data.created_by}
            className="mt-1 block w-full"
            autoComplete="created_by"
            onChange={(e) => setData("created_by", e.target.value)}
            required
          />

          <InputError message={errors.created_by} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
