import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Show({ projectMember }) {
  const { auth } = usePage().props;

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project member?")) {
      // Call delete route
      axios
        .delete(route("projectmembers.destroy", projectMember.id))
        .then(() => {
          // Redirect or reload page after deletion
          window.location.href = route("projectmembers.index");
        })
        .catch((error) => {
          console.error("There was an error deleting the project member:", error);
        });
    }
  };

  return (
    <GuestLayout>
      <Head title="Project Member Details" />

      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Project Member Details</h1>

        <div className="mb-4">
          <strong>Project ID:</strong> {projectMember.project_id}
        </div>

        <div className="mb-4">
          <strong>Created By:</strong> {projectMember.created_by}
        </div>
        <div className="mb-4">
          <strong>Role:</strong> {projectMember.role}
        </div>
        <div className="flex items-center space-x-4 mt-6">
          <Link href={route("projectmembers.edit", projectMember.id)}>
            <PrimaryButton>Edit</PrimaryButton>
          </Link>
        <SecondaryButton onClick={handleDelete}>
            Delete
        </SecondaryButton>
        </div>
      </div>
    </GuestLayout>
  );
}
