import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function ContactUs() {
  return (
    <AuthenticatedLayout>
      <div className="mx-auto min-h-[100svh]  pb-8 xl:pb-16">
        <div className="xl:gap-x-18  flex items-center justify-center gap-x-4   bg-[url('/category-bg.jpeg')] text-center sm:gap-x-20 ">
          <h1 className="-y-[20px] sm:-y-6 xl:-y-10 text-primaryColor text-[28px] font-bold min-[425px]:text-[34px] md:text-[44px] lg:text-[49px] min-[1200px]:text-[55px]">
            Contact us
          </h1>
          <img
            src="image/contact.svg"
            alt="contact us"
            className="w-[100px] sm:w-[120px] xl:w-[150px]  "
          />
        </div>
        <div className="mx-auto   mt-24 max-w-[1170px]">
          <div className="mx-auto   grid justify-items-center gap-y-12 text-center lg:grid-cols-3">
            <div className="relative w-[90%] max-w-[481px] bg-[#ecf4fa] py-8  shadow-sm shadow-[#BAB7BC] ">
              <div className="absolute  left-[45%] top-[-30px] rounded-full bg-white p-2 shadow-md shadow-[#BAB7BC] ">
                <svg
                  className="size-[35px] fill-primaryColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
              </div>
              <div className="mt-4">
                <h2 className="mb-3  text-[18px] font-bold">Address</h2>
                <div className=" grid space-y-1 text-gray-500 ">
                  <p className="">Addis Ababa, Ethiopia </p>
                </div>
              </div>
            </div>
            <div className="relative w-[90%] max-w-[481px] bg-[#ecf4fa] py-8  shadow-sm shadow-[#BAB7BC] ">
              <div className="absolute  left-[45%] top-[-30px] rounded-full bg-white p-2 shadow-md shadow-[#BAB7BC] ">
                <svg
                  className="size-[35px] fill-primaryColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
              </div>
              <div className="mt-4">
                <h2 className="mb-2  text-[18px] font-bold">Contact</h2>
                <div className="grid space-y-1 text-gray-500">
                  <a href="tel:+251953988777" className="hover:text-black">
                    +25175434719
                  </a>

                  <a href="tel:+1310 570 9291" className="hover:text-black">
                    +25129102230
                  </a>
                  <a href="tel:+1310 570 9291" className="hover:text-black">
                    +251921607264
                  </a>
                </div>
              </div>
            </div>
            <div className="relative w-[90%] max-w-[481px] bg-[#ecf4fa] py-8  shadow-sm shadow-[#BAB7BC] ">
              <div className="absolute  left-[45%] top-[-30px] rounded-full bg-white p-2 shadow-md shadow-[#BAB7BC] ">
                <svg
                  className="size-[35px] fill-primaryColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                </svg>
              </div>
              <div className="mt-4">
                <h2 className="mb-2  text-[18px] font-bold">Email</h2>
                <div className="grid space-y-1 text-gray-500">
                  <a
                    href="mailto: info@soderestore.com"
                    className="hover:text-black"
                  >
                    gizebetofficial@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-16  mb-8 ">
          <h1 className=" sm:-y-6 xl:-y-10 text-center text-[28px] font-bold text-[#2178ac] min-[425px]:text-[34px] md:text-[44px] lg:text-[49px] min-[1200px]:text-[55px]">
            Location
          </h1>
          <div className="mx-auto   grid  max-w-[550px] items-center  gap-x-10 gap-y-16 px-4 sm:max-w-[640px] lg:max-w-[1170px]  lg:grid-cols-3 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7880.985380490828!2d38.82135823972735!3d9.018739358702142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9b45dabfc671%3A0x3f2af57cb6b677df!2sSalite%20meheret!5e0!3m2!1sen!2set!4v1729031824165!5m2!1sen!2set"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="  -1 mt-8 aspect-[4/3] w-full  md:col-span-2 "
            ></iframe>

            <div className="">
              {/* <h1 className="font-semibold">
                When you order from any country, we ship products from the
                nearest country for your shipping address. We have distribution
                centers in the following cities.
              </h1>
              <div className=" mt-4 space-y-4">
                <p className=" text-[15px] text-gray-500  ">
                  Addis Ababa, Ethiopia
                </p>
                <p className=" text-[15px] text-gray-500  ">
                  California, USA - 825 Wilshire Blvd #527, Santa Monica CA
                  90401 USA
                </p>
                <p className=" text-[15px] text-gray-500  ">
                  Canada - Soderestore 214 - 19138 26th Ave Suite #N280206
                  Surrey, BC, V3Z 3V7 Canada
                </p>
                <p className=" text-[15px] text-gray-500  ">
                  Germany - SodereStore Suite 30876097, Shop2Ship, Wahlerstrasse
                  18a, 40472, Duesseldorf, NRW, Germany
                </p>
                <p className=" text-[15px] text-gray-500  ">
                  UK - Soderestore Girum Assefa 68 Tanners Drive Suite #D280206
                  Blakelands, MK, MK14 5BP United Kingdom
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
