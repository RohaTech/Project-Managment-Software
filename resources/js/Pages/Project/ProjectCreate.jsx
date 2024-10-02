import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Textarea } from "@headlessui/react";
import { useState, useEffect } from "react";
import ProjectCreateDialog from "@/Components/ProjectComponent/ProjectCreateDialog";

export default function Project() {
  const [isCreateDialog, setIsisCreateDialog] = useState(false);
  return (
    <AuthenticatedLayout>
      <div className="flex flex-col items-center  min-h-[600px] -translate-y-10  justify-center ">
        <div className="">
          <h1 className="text-2xl">Create a new project</h1>
          <h2 className="text-lg">How would you like to start?</h2>
        </div>
        <div className="flex gap-x-4 mt-8 cursor-pointer">
          <div
            onClick={() => setIsisCreateDialog(true)}
            className="h-[220px] rounded-xl w-[150px] flex flex-col justify-center items-center hover:shadow-xl  hover:-translate-y-4   duration-300 ease-linear hover:bg-[#f8f7f7]"
          >
            <div className="size-[120px] border-[3px] border-dotted border-[#edeae9] rounded-lg mb-4 flex justify-center items-center ">
              <svg
                className="size-5 fill-[#afabac]  "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="font-semibold ">Blank Project</h1>
              <h2 className="text-[#afabac] text-sm">Use Default Layout</h2>
            </div>
          </div>
          <div className="h-[220px] rounded-xl w-[150px] flex-col flex justify-center items-center hover:-translate-y-4 hover:shadow-xl group  duration-300 ease-linear hover:bg-[#f8f7f7]">
            <div className="size-[120px] border border-[#edeae9] rounded-lg mb-4 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0,0,256,256"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                >
                  <g transform="scale(6.4,6.4)">
                    <path
                      d="M3.547,37.449c0.225,-2.446 0.939,-7.464 2.296,-8.859c0.838,-0.862 1.951,-1.337 3.133,-1.337c1.183,0 2.296,0.475 3.134,1.337c1.739,1.789 1.739,4.699 0,6.488c-1.35,1.39 -6.188,2.133 -8.563,2.371z"
                      fill="#1868db"
                    ></path>
                    <path
                      d="M8.977,27.753c1.047,0 2.032,0.421 2.775,1.185c1.552,1.597 1.552,4.195 0,5.791c-1.053,1.083 -4.853,1.837 -7.648,2.158c0.304,-2.894 1.034,-6.854 2.099,-7.949c0.742,-0.764 1.727,-1.185 2.774,-1.185M8.977,26.753c-1.264,0 -2.528,0.496 -3.492,1.488c-1.929,1.985 -2.485,9.759 -2.485,9.759c0,0 7.54,-0.589 9.469,-2.573c1.929,-1.984 1.929,-5.201 0,-7.185c-0.965,-0.993 -2.228,-1.489 -3.492,-1.489z"
                      fill="#4788c7"
                    ></path>
                    <path
                      d="M9.887,33.302c-0.643,0.661 -3.112,0.823 -3.112,0.823c0,0 0.141,-2.557 0.784,-3.218c0.643,-0.661 1.685,-0.661 2.328,0c0.643,0.661 0.642,1.734 0,2.395z"
                      fill="#ffffff"
                    ></path>
                    <path
                      d="M13.379,35.694c-0.304,0 -0.589,-0.123 -0.805,-0.346l-6.985,-7.186c-0.455,-0.468 -0.455,-1.229 0,-1.697l4.298,-4.421l8.615,8.862l-4.317,4.441c-0.217,0.224 -0.503,0.347 -0.806,0.347z"
                      fill="blue"
                    ></path>
                    <path
                      d="M9.887,22.762l7.917,8.146l-3.979,4.093c-0.121,0.124 -0.28,0.193 -0.447,0.193c-0.167,0 -0.326,-0.069 -0.447,-0.193l-6.984,-7.185c-0.264,-0.271 -0.264,-0.73 0,-1.001l3.94,-4.053M9.887,21.327l-4.656,4.79c-0.643,0.661 -0.643,1.734 0,2.395l6.984,7.185c0.321,0.331 0.743,0.496 1.164,0.496c0.421,0 0.843,-0.165 1.164,-0.496l4.656,-4.79l-9.312,-9.58z"
                      fill="#4788c7"
                    ></path>
                    <path
                      d="M18.449,34.209l-11.753,-12.092l-4.128,-2.124l4.104,-4.222c0.527,-0.542 1.226,-0.841 1.968,-0.841c0.183,0 0.366,0.02 0.545,0.056l3.941,0.812l11.43,11.758l0.79,4.064c0.185,0.952 -0.102,1.931 -0.768,2.615l-4.077,4.195z"
                      fill="blue"
                    ></path>
                    <path
                      d="M8.641,15.431v0c0.148,0 0.298,0.015 0.444,0.045l3.791,0.78l11.218,11.542l0.762,3.918c0.154,0.792 -0.084,1.604 -0.636,2.172l-3.581,3.684l-1.705,-3.508l-0.07,-0.145l-0.112,-0.115l-11.641,-11.977l-0.114,-0.117l-0.146,-0.075l-3.455,-1.777l3.634,-3.738c0.432,-0.444 1.004,-0.689 1.611,-0.689M8.641,14.431c-0.864,0 -1.704,0.351 -2.328,0.992l-4.574,4.706l4.656,2.395l11.639,11.976l2.328,4.79l4.574,-4.706c0.778,-0.801 1.116,-1.949 0.9,-3.059l-0.819,-4.21l-11.64,-11.976l-4.092,-0.842c-0.213,-0.044 -0.43,-0.066 -0.644,-0.066z"
                      fill="#4788c7"
                    ></path>
                    <g>
                      <path
                        d="M5.928,23.722l18.285,-18.813c1.51,-1.554 5.021,-2.409 9.885,-2.409c1.458,0 2.663,0.079 3.263,0.127c0.159,1.98 0.665,10.587 -2.225,13.561l-18.265,18.791z"
                        fill="#dff0fe"
                      ></path>
                      <path
                        d="M34.1,3v0c1.154,0 2.147,0.05 2.8,0.094c0.247,3.361 0.234,10.32 -2.123,12.745l-17.906,18.424l-10.246,-10.541l17.947,-18.464c1.415,-1.456 4.799,-2.258 9.528,-2.258M34.1,2c-3.385,0 -8.16,0.415 -10.246,2.561c-3.402,3.501 -18.623,19.161 -18.623,19.161l11.64,11.976c0,0 15.162,-15.6 18.624,-19.161c3.462,-3.561 2.328,-14.371 2.328,-14.371c0,0 -1.584,-0.166 -3.723,-0.166z"
                        fill="#4788c7"
                      ></path>
                    </g>
                    <g>
                      <path
                        d="M20.5,16.5c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z"
                        fill="blue"
                      ></path>
                      <path
                        d="M20.5,17c1.379,0 2.5,1.121 2.5,2.5c0,1.379 -1.121,2.5 -2.5,2.5c-1.379,0 -2.5,-1.121 -2.5,-2.5c0,-1.379 1.121,-2.5 2.5,-2.5M20.5,16c-1.933,0 -3.5,1.567 -3.5,3.5c0,1.933 1.567,3.5 3.5,3.5c1.933,0 3.5,-1.567 3.5,-3.5c0,-1.933 -1.567,-3.5 -3.5,-3.5z"
                        fill="#4788c7"
                      ></path>
                    </g>
                    <g>
                      <path
                        d="M28.5,8.5c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z"
                        fill="blue"
                      ></path>
                      <path
                        d="M28.5,9c1.379,0 2.5,1.121 2.5,2.5c0,1.379 -1.121,2.5 -2.5,2.5c-1.379,0 -2.5,-1.121 -2.5,-2.5c0,-1.379 1.121,-2.5 2.5,-2.5M28.5,8c-1.933,0 -3.5,1.567 -3.5,3.5c0,1.933 1.567,3.5 3.5,3.5c1.933,0 3.5,-1.567 3.5,-3.5c0,-1.933 -1.567,-3.5 -3.5,-3.5z"
                        fill="#4788c7"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="text-center">
              <h1 className="font-semibold ">Use a template</h1>
              <h2 className="text-[#afabac] text-sm">Choose From Library</h2>
            </div>
          </div>

          <Link
            href={route("project.copy")}
            className="h-[220px] rounded-xl w-[150px] flex flex-col justify-center items-center hover:-translate-y-4 hover:shadow-xl group  duration-300 ease-linear hover:bg-[#f8f7f7]"
          >
            <div className="size-[120px] border border-[#edeae9] rounded-lg mb-4 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0,0,256,256"
              >
                <defs>
                  <linearGradient
                    x1="48.5"
                    y1="7"
                    x2="48.5"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                    id="color-1_43610_gr1"
                  >
                    <stop offset="0" stopColor="#1868db"></stop>
                    <stop offset="1" stopColor="#1868db"></stop>
                  </linearGradient>
                  <linearGradient
                    x1="32"
                    y1="6"
                    x2="32"
                    y2="58"
                    gradientUnits="userSpaceOnUse"
                    id="color-2_43610_gr2"
                  >
                    <stop offset="0" stopColor="#1a6dff"></stop>
                    <stop offset="1" stopColor="#1868db"></stop>
                  </linearGradient>
                </defs>
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                >
                  <g transform="scale(4,4)">
                    <path
                      d="M44,7v8.1c0,0.497 0.403,0.9 0.9,0.9h8.1z"
                      fill="url(#color-1_43610_gr1)"
                    ></path>
                    <path
                      d="M53.092,14.527l-7.895,-7.677c-0.564,-0.548 -1.306,-0.85 -2.092,-0.85h-20.105c-1.654,0 -3,1.346 -3,3v5h-7c-1.654,0 -3,1.346 -3,3v38c0,1.654 1.346,3 3,3h28c1.654,0 3,-1.346 3,-3v-5h7c1.654,0 3,-1.346 3,-3v-30.322c0,-0.807 -0.331,-1.59 -0.908,-2.151zM45,9.448l5.709,5.552h-4.709c-0.551,0 -1,-0.448 -1,-1zM51,48h-7h-2h-19c-0.551,0 -1,-0.448 -1,-1v-23h-2v23c0,1.654 1.346,3 3,3h19v5c0,0.552 -0.449,1 -1,1h-28c-0.551,0 -1,-0.448 -1,-1v-38c0,-0.552 0.449,-1 1,-1h7h1.917h0.083v-7c0,-0.552 0.449,-1 1,-1h20v6c0,1.654 1.346,3 3,3h6v30c0,0.552 -0.449,1 -1,1z"
                      fill="url(#color-2_43610_gr2)"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="text-center">
              <h1 className="font-semibold ">Copy Project</h1>
              <h2 className="text-[#afabac] text-sm">Duplicate project</h2>
            </div>
          </Link>
        </div>
      </div>
      <ProjectCreateDialog
        isCreateDialog={isCreateDialog}
        setIsisCreateDialog={setIsisCreateDialog}
      />
    </AuthenticatedLayout>
  );
}
