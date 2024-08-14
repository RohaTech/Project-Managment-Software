import ApplicationLogo from "@/Components/ApplicationLogo";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, router } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
    document.getElementById("background")?.classList.add("!hidden");
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Welcome" />
      <div className="min-h-svh ">
        <section className="bg-white   ">
          <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
                Unify Your Team's Workflow.
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
                Bring tasks, tools, and teams together in one place, empowering
                you to achieve more with seamless collaboration .
              </p>
              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <Link href={route("register")}>
                  <PrimaryButton className="bg-primaryColor py-3">
                    Get Started
                  </PrimaryButton>
                </Link>
              </div>
            </div>
            <div className=" hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="/image/hero-animation-homepage-600-1.svg" alt="" />
            </div>
          </div>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
