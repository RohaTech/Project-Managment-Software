import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function Home({ auth }) {
  return (
    <AuthenticatedLayout auth={auth}>
      <div>Home</div>;
    </AuthenticatedLayout>
  );
}
