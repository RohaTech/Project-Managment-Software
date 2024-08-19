import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ProjectMemberRegistration() {
  const { data, setData, post, processing, errors, reset } = useForm({
    project_id: "",
    usere_id: "",
    role:"",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("projectmembers.store"), {
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
            id="user_id"
            name="user_id"
            value={data.user_id}
            className="mt-1 block w-full"
            autoComplete="user_id"
            onChange={(e) => setData("user_id", e.target.value)}
            required
          />

          <InputError message={errors.created_by} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="roel" value="role" />

          <TextInput
            id="role"
            name="role"
            value={data.role}
            className="mt-1 block w-full"
            autoComplete="role"
            onChange={(e) => setData("role", e.target.value)}
            required
          />

          <InputError message={errors.role} className="mt-2" />
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
