import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Register() {
  const { search } = window.location; 
  const params = new URLSearchParams(search);
  const invitationToken = params.get("invitation_token");
  const emailFromInvitation = params.get("email");

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: emailFromInvitation || "", 
    password: "",
    password_confirmation: "",
    invitation_token: invitationToken || "", 
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />
      <div className="flex flex-col sm:justify-center items-center mt-24 pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={submit}>
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
                required
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="password" value="Password" />

              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData("password", e.target.value)}
                required
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel
                htmlFor="password_confirmation"
                value="Confirm Password"
              />

              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
              />

              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>

            <input
              type="hidden"
              name="invitation_token"
              value={data.invitation_token}
            />

            <div className="flex items-center justify-end mt-4">
              <Link
                href={route("login")}
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Already registered?
              </Link>

              <PrimaryButton className="ms-4 bg-primary" disabled={processing}>
                Register
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}
