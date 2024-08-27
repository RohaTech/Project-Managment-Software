import ApplicationLogo from "@/Components/ApplicationLogo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import ActivityIcon from "./ActivityIcon"
import ProjectIcon from "./ProjectIcon";

export default function Home({ user, projects, activities }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isUpdateFeed, setIsUpdateFeed] = useState(true);
    const [isFavourite, setIsFavourite] = useState({});
    const [greeting, setGreeting] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const getGreeting = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                return "Good Morning";
            } else if (currentHour < 18) {
                return "Good Afternoon";
            } else {
                return "Good Evening";
            }
        };

        const formatDate = () => {
            const date = new Date();
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        };

        setGreeting(getGreeting());
        setFormattedDate(formatDate());
    }, []);


    const handleUpdateFeed = ()=>{
        setIsUpdateFeed(!isUpdateFeed);
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleFavourite = (index) => {
        setIsFavourite((prevFavorites) => ({
            ...prevFavorites,
            [index]: !prevFavorites[index]
        }));
    }

    function formatDate(date) {
        return new Date(date).toLocaleString();
    }

    return (
    <AuthenticatedLayout
      user={user}
    >
      <div className="w-full flex flex-col gap-y-4">
        <div className="">
            <div className="p-4 shadow-xl mb-4 rounded-lg">
                <div className="flex justify-between items-center ">
                    <div className="flex flex-col  ">
                        <div>{formattedDate}</div>
                        <div className="text-2xl ">{greeting}, {user.name}</div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="text-gray-800 flex gap-x-2 items-center px-2 cursor-pointer"><svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1f2937" d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>Give feedback</div>
                        <div className="text-white flex gap-x-2 items-center bg-[#0060b9eb] hover:bg-[#779cbeeb] transition duration-300 ease-in-out px-4 py-2 rounded-lg cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 448 512"><path fill="#ffffff" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z"/></svg>Quick Search</div>
                    </div>
                </div>
            </div>

            <div className="flex px-4 gap-x-3">
                    <div className="w-2/3 shadow-lg px-4">
                        <ul>
                            <li className="flex gap-x-1 items-center font-bold text-[#323338] py-4 2"><span className="cursor-pointer" onClick={handleOpen}>{!isOpen ? <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#323338" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 " viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>}</span>Recently Created</li>
                            <div className="grid grid-cols-2 gap-4 px-2 pb-2">
            {isOpen &&
                projects.slice(0, 4).map((project, index) => (
                    <div key={index} className="p-4 border-2 rounded-md border-gray ml-6">
                        <div className="w-full">
                            <img className="w-full rounded-md" src="/image/homePageImage/quick_search_recent_board.svg" alt="" />
                        </div>
                        <div className="flex justify-between items-center my-2">
                            <div className="flex items-center gap-x-2">
                                <div className="w-4">
                                {ProjectIcon[index]}
                                </div>
                                <Link href={route('project.show', project.id)} className="font-bold text-md truncate w-[18ch] hover:text-[gray] transition duration-300 ease-in-out ">{project.name}</Link>
                            </div>
                            <div onClick={() => handleFavourite(index)} className="w-6 cursor-pointer hover:bg-[#e4e4de] rounded-sm p-1 transition duration-300 ease-in-out">
                                {isFavourite[index] ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                    </svg>:
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                                    </svg>}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-graydark text-xs">Work management &gt; Main Workspace</h3>
                        </div>
                    </div>
                ))
            }
            {(projects.length > 4 && isOpen) && (
                <div className="col-span-2 ml-auto">
                    <Link href={route('project.index')} className="text-blue-500 text-[13px] hover:underline flex items-center hover:scale-105 transition duration-300 ease-in-out">Show All Projects<svg width="20px" height="10px" viewBox="0 -6.5 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#5e5c64"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>right-arrow</title> <desc>Created with Sketch.</desc> <g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-1511.000000, -158.000000)" fill="#0011ff" fill-rule="nonzero"> <g id="1" transform="translate(1350.000000, 120.000000)"> <path d="M187.812138,38.5802109 L198.325224,49.0042713 L198.41312,49.0858421 C198.764883,49.4346574 198.96954,49.8946897 199,50.4382227 L198.998248,50.6209428 C198.97273,51.0514917 198.80819,51.4628128 198.48394,51.8313977 L198.36126,51.9580208 L187.812138,62.4197891 C187.031988,63.1934036 185.770571,63.1934036 184.990421,62.4197891 C184.205605,61.6415481 184.205605,60.3762573 184.990358,59.5980789 L192.274264,52.3739093 L162.99947,52.3746291 C161.897068,52.3746291 161,51.4850764 161,50.3835318 C161,49.2819872 161.897068,48.3924345 162.999445,48.3924345 L192.039203,48.3917152 L184.990421,41.4019837 C184.205605,40.6237427 184.205605,39.3584519 184.990421,38.5802109 C185.770571,37.8065964 187.031988,37.8065964 187.812138,38.5802109 Z" id="right-arrow"> </path> </g> </g> </g> </g></svg></Link>
                </div>
            )}
        </div>
                <li className="flex gap-x-1 items-center font-bold text-[#323338] py-2"><span className="cursor-pointer transition duration-300 ease-in-out" onClick={handleUpdateFeed}>{!isUpdateFeed ? <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#323338" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 " viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>}</span>Update Feed (inbox) <span className="bg-blue-500 rounded-full px-[5px] text-white" >{activities.length}</span></li>
                        {
            isUpdateFeed &&
                     <div className="">
                         {activities.map((activity, index) =>
                                (
                                    <div key={index} className="ml-8 flex items-start gap-x-2 shadow-zinc-400 py-1">
                                    <div className="flex-shrink-0 bg-slate-200 p-[6px] rounded-full">
                                        {ActivityIcon[Math.floor(Math.random() * ActivityIcon.length)]}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold">{activity.user} {activity.activity}</div>
                                        <div className="text-xs font-light text-gray-500">
                                            {formatDate(activity.created_at)}
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                     </div>
            }
                        </ul>
                    </div>
                <div className="w-1/3  p-4 h-screen">
                    <div className="flex p-8 shadow-xl rounded-xl flex-col gap-y-2  w-full">
                        <div className="w-full">
                            <img className="w-full" src="/image/homePageImage/templates-banner.png" alt=""  />
                        </div>
                        <h3>Boost your work-flow in minutes with ready-made templates</h3>
                        <div className="self-center text-center border-[1px] border-graydark rounded-xl w-full py-2 hover:bg-[#d7d3d3] transition duration-300 ease-in-out"><Link href="">Explore Templates</Link></div>
                    </div>
                        <h3 className="my-4 ml-2">Learn & get inspired</h3>
                    <div className="flex gap-x-4 items-center hover:shadow-5 p-2 mb-2 rounded-lg transition duration-300 ease-in-out">
                    <div className="bg-slate-200 p-1 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                    <linearGradient id="0fNVDNBGs8zFiB7cDozbWa_bY5t0noHcfXn_gr1" x1="13.954" x2="21.965" y1="30.687" y2="35.153" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0b71d9"></stop><stop offset=".628" stop-color="#264774"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWa_bY5t0noHcfXn_gr1)" d="M20.467,19.052c-1.592,0.377-3.243,0.136-4.949-0.707c-3.009,1.792-5.54,3.964-7.748,6.394	l7.747,3.505L20.467,19.052z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWb_bY5t0noHcfXn_gr2" x1="29.537" x2="38.043" y1="32.945" y2="29.515" gradientTransform="scale(-1 1) rotate(-45 9 106.674)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0b71d9"></stop><stop offset="1" stop-color="#264774"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWb_bY5t0noHcfXn_gr2)" d="M28.952,27.536c-0.377,1.592-0.136,3.243,0.707,4.949c-1.792,3.009-3.964,5.54-6.394,7.748	l-3.505-7.747L28.952,27.536z"></path><radialGradient id="0fNVDNBGs8zFiB7cDozbWc_bY5t0noHcfXn_gr3" cx="26.765" cy="20.517" r="15.992" gradientTransform="matrix(.6804 .7329 -2.6254 2.4374 66.197 -45.252)" gradientUnits="userSpaceOnUse"><stop offset=".17" stop-color="#999"></stop><stop offset=".481" stop-color="#eee"></stop><stop offset=".707" stop-color="#ececec"></stop><stop offset=".788" stop-color="#e5e5e5"></stop><stop offset=".846" stop-color="#dadada"></stop><stop offset=".893" stop-color="#c9c9c9"></stop><stop offset=".933" stop-color="#b3b3b3"></stop><stop offset=".968" stop-color="#989898"></stop><stop offset=".999" stop-color="#797979"></stop><stop offset="1" stop-color="#787878"></stop></radialGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWc_bY5t0noHcfXn_gr3)" d="M41.066,7.782c-0.05-0.444-0.401-0.795-0.845-0.845C35.373,6.388,28.841,6.707,24.8,12.07	L13.452,27.593l3.479,3.479l3.479,3.479l15.523-11.347C41.296,19.163,41.615,12.631,41.066,7.782z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWd_bY5t0noHcfXn_gr4" x1="18.438" x2="25.466" y1="35.855" y2="35.912" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0b71d9"></stop><stop offset="1" stop-color="#264774"></stop></linearGradient><polygon fill="url(#0fNVDNBGs8zFiB7cDozbWd_bY5t0noHcfXn_gr4)" points="19.053,36.022 11.982,28.951 14.103,28.244 19.76,33.9"></polygon><linearGradient id="0fNVDNBGs8zFiB7cDozbWe_bY5t0noHcfXn_gr5" x1="21.902" x2="21.834" y1="38.285" y2="47.954" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff7900"></stop><stop offset="1" stop-color="#e51e25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWe_bY5t0noHcfXn_gr5)" d="M17.259,34.223l-1.739-1.739l-1.739-1.739c0,0-3.892-0.011-5.731,3.293	c0.957,0.049,0.766,0.763-0.214,1.603c-0.573,0.492-0.928,1.403-0.93,2.216c0.952-0.277,0.713,1.581,0.095,3.145	c1.564-0.618,3.423-0.857,3.145,0.095c0.814-0.003,1.721-0.36,2.213-0.933c0.84-0.979,1.557-1.168,1.606-0.21	C17.27,38.115,17.259,34.223,17.259,34.223z"></path><radialGradient id="0fNVDNBGs8zFiB7cDozbWf_bY5t0noHcfXn_gr6" cx="21.945" cy="37.248" r="9.096" gradientTransform="rotate(45.001 33.751 31.042) scale(1 1.2072)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".254" stop-color="#ffda4e"></stop><stop offset=".699" stop-color="#ff7900"></stop><stop offset=".975" stop-color="#e51f25"></stop></radialGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWf_bY5t0noHcfXn_gr6)" d="M16.992,33.956l-1.472-1.472l-1.472-1.472c-0.936,0.088-3.546,0.969-5.205,2.971	c0.517,0.316,0.365,1.119-0.028,1.596c-0.317,0.384-1.229,0.965-1.584,2.084c0.768-0.151,1.058,0.857,0.366,2.745	c1.888-0.692,2.896-0.402,2.745,0.366c1.119-0.355,1.7-1.267,2.084-1.584c0.477-0.394,1.281-0.545,1.596-0.028	C16.024,37.502,16.904,34.892,16.992,33.956z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWg_bY5t0noHcfXn_gr7" x1="22.524" x2="21.365" y1="32.412" y2="48.326" gradientTransform="rotate(46.717 23.591 27.646)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".404" stop-color="#ffda4e"></stop><stop offset=".699" stop-color="#ff7900"></stop><stop offset=".975" stop-color="#e51f25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWg_bY5t0noHcfXn_gr7)" d="M14.4,33.571c-1.712,2.272-3.97,2.14-5.959,5.973C10.848,36.744,13.428,36.879,14.4,33.571z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWh_bY5t0noHcfXn_gr8" x1="24.574" x2="23.754" y1="35.699" y2="46.96" gradientTransform="matrix(.7174 .6967 -.8119 .836 29.893 -13.915)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".254" stop-color="#ffda4e"></stop><stop offset=".594" stop-color="#ff7900"></stop><stop offset=".975" stop-color="#e51f25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWh_bY5t0noHcfXn_gr8)" d="M10.87,39.948c1.462-3.3,3.253-2.354,5.009-4.775C14.765,38.553,12.765,38.255,10.87,39.948z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWi_bY5t0noHcfXn_gr9" x1="21.928" x2="21.337" y1="35.886" y2="44.002" gradientTransform="matrix(.969 .9374 -.9598 .9921 29.654 -25.434)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".28" stop-color="#ffda4e"></stop><stop offset=".834" stop-color="#ff7900"></stop><stop offset=".943" stop-color="#e51f25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWi_bY5t0noHcfXn_gr9)" d="M10.997,35.686c0.83-2.135,2.042-1.657,3.108-3.194	C13.511,34.693,12.189,34.638,10.997,35.686z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWj_bY5t0noHcfXn_gr10" x1="22.953" x2="22.45" y1="38.736" y2="45.636" gradientTransform="matrix(.7656 1.1098 -1.1363 .7838 42.552 -20.313)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".28" stop-color="#ffda4e"></stop><stop offset=".536" stop-color="#ff7900"></stop><stop offset=".943" stop-color="#e51f25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWj_bY5t0noHcfXn_gr10)" d="M8.28,40.255c1.037-1.72,1.935-1.095,3.061-2.253C10.482,39.821,9.423,39.545,8.28,40.255z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWk_bY5t0noHcfXn_gr11" x1="25.498" x2="25.047" y1="39.306" y2="45.51" gradientTransform="matrix(-.9692 -1.2218 -1.0815 .8578 80.487 30.673)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".28" stop-color="#ffda4e"></stop><stop offset=".491" stop-color="#ff7900"></stop><stop offset=".943" stop-color="#e51f25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWk_bY5t0noHcfXn_gr11)" d="M7.683,38.442c1.724-0.395,1.372-1.487,2.625-2.167C8.536,36.461,8.548,37.586,7.683,38.442z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWl_bY5t0noHcfXn_gr12" x1="27.104" x2="26.555" y1="35.365" y2="42.897" gradientTransform="matrix(-1.0373 -.8612 -.8818 1.0621 76.835 16.854)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".37" stop-color="#ffda4e"></stop><stop offset=".834" stop-color="#ff7900"></stop><stop offset=".943" stop-color="#e51f25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWl_bY5t0noHcfXn_gr12)" d="M13.483,36.588c1.93-0.972,1.354-2.021,2.696-3.145	C14.16,34.209,14.349,35.401,13.483,36.588z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWm_bY5t0noHcfXn_gr13" x1="24.645" x2="23.832" y1="35.245" y2="46.405" gradientTransform="matrix(-.6743 -.7385 -.933 .8519 65.127 17.391)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"></stop><stop offset=".254" stop-color="#ffda4e"></stop><stop offset=".602" stop-color="#ff7900"></stop><stop offset=".975" stop-color="#e51f25"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWm_bY5t0noHcfXn_gr13)" d="M8.134,36.827c3.275-1.446,2.812-3.157,5.262-4.88C10.068,33.058,9.893,34.976,8.134,36.827z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWn_bY5t0noHcfXn_gr14" x1="21.311" x2="22.311" y1="32.285" y2="32.285" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#264774"></stop><stop offset="1" stop-color="#264774"></stop></linearGradient><polygon fill="url(#0fNVDNBGs8zFiB7cDozbWn_bY5t0noHcfXn_gr14)" points="15.536,33.079 14.828,32.372 21.9,25.301 22.607,26.008"></polygon><rect width="1" height="2.346" x="22.582" y="23.652" fill="#288bd7" transform="rotate(45.001 23.083 24.825)"></rect><linearGradient id="0fNVDNBGs8zFiB7cDozbWo_bY5t0noHcfXn_gr15" x1="18.089" x2="25.664" y1="4.507" y2="4.507" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f68381"></stop><stop offset=".547" stop-color="#e62228"></stop><stop offset=".903" stop-color="#8e2809"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWo_bY5t0noHcfXn_gr15)" d="M40.522,16.479c0.876-2.951,0.841-6.07,0.544-8.697c-0.05-0.444-0.401-0.795-0.845-0.845	c-2.626-0.297-5.746-0.332-8.697,0.544L40.522,16.479z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWp_bY5t0noHcfXn_gr16" x1="14.567" x2="29.191" y1="9.838" y2="9.838" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".8"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWp_bY5t0noHcfXn_gr16)" d="M39.837,18.32L29.683,8.166c-0.113,0.051-0.227,0.097-0.338,0.152l10.341,10.341	C39.74,18.547,39.786,18.433,39.837,18.32z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWq_bY5t0noHcfXn_gr17" x1="14.69" x2="29.067" y1="9.515" y2="9.515" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset=".293" stop-color="#cbcbcb"></stop><stop offset="1" stop-color="#666"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWq_bY5t0noHcfXn_gr17)" d="M39.979,18.004l-9.98-9.98c-0.114,0.048-0.226,0.1-0.338,0.152l10.166,10.166	C39.878,18.23,39.931,18.118,39.979,18.004z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWr_bY5t0noHcfXn_gr18" x1="15.175" x2="28.582" y1="23.578" y2="23.578" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".8"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><polygon fill="url(#0fNVDNBGs8zFiB7cDozbWr_bY5t0noHcfXn_gr18)" points="29.785,27.698 20.305,18.219 20.098,18.502 29.502,27.905"></polygon><linearGradient id="0fNVDNBGs8zFiB7cDozbWs_bY5t0noHcfXn_gr19" x1="15.125" x2="28.632" y1="23.254" y2="23.254" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset=".293" stop-color="#cbcbcb"></stop><stop offset="1" stop-color="#666"></stop></linearGradient><polygon fill="url(#0fNVDNBGs8zFiB7cDozbWs_bY5t0noHcfXn_gr19)" points="30.049,27.505 20.498,17.954 20.291,18.237 29.766,27.712"></polygon><radialGradient id="0fNVDNBGs8zFiB7cDozbWt_bY5t0noHcfXn_gr20" cx="22.767" cy="17.138" r="5.887" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity=".8"></stop><stop offset=".384" stop-color="#020202" stop-opacity=".491"></stop><stop offset=".53" stop-color="#090909" stop-opacity=".373"></stop><stop offset=".636" stop-color="#151515" stop-opacity=".288"></stop><stop offset=".722" stop-color="#262626" stop-opacity=".218"></stop><stop offset=".797" stop-color="#3c3c3c" stop-opacity=".158"></stop><stop offset=".863" stop-color="#585858" stop-opacity=".105"></stop><stop offset=".923" stop-color="#797979" stop-opacity=".057"></stop><stop offset=".976" stop-color="#9e9e9e" stop-opacity=".014"></stop><stop offset=".993" stop-color="#ababab" stop-opacity="0"></stop></radialGradient><circle cx="30.069" cy="19.191" r="6.169" fill="url(#0fNVDNBGs8zFiB7cDozbWt_bY5t0noHcfXn_gr20)"></circle><linearGradient id="0fNVDNBGs8zFiB7cDozbWu_bY5t0noHcfXn_gr21" x1="17.155" x2="27.634" y1="16.879" y2="16.879" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e7e7e7"></stop><stop offset="1" stop-color="#999"></stop></linearGradient><circle cx="29.659" cy="18.344" r="5.455" fill="url(#0fNVDNBGs8zFiB7cDozbWu_bY5t0noHcfXn_gr21)"></circle><linearGradient id="0fNVDNBGs8zFiB7cDozbWv_bY5t0noHcfXn_gr22" x1="26.518" x2="17.956" y1="16.833" y2="16.917" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c8c8c8"></stop><stop offset="1" stop-color="#aaa"></stop></linearGradient><circle cx="29.659" cy="18.344" r="4.457" fill="url(#0fNVDNBGs8zFiB7cDozbWv_bY5t0noHcfXn_gr22)"></circle><linearGradient id="0fNVDNBGs8zFiB7cDozbWw_bY5t0noHcfXn_gr23" x1="17.879" x2="25.879" y1="16.879" y2="16.879" gradientTransform="rotate(45.001 24 27.003)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#78d9f4"></stop><stop offset=".846" stop-color="#0b71d9"></stop></linearGradient><circle cx="29.659" cy="18.344" r="4" fill="url(#0fNVDNBGs8zFiB7cDozbWw_bY5t0noHcfXn_gr23)"></circle><radialGradient id="0fNVDNBGs8zFiB7cDozbWx_bY5t0noHcfXn_gr24" cx="36.084" cy="-5.535" r="4.264" gradientTransform="rotate(-44.998 61.71 39.148) scale(1.4829 .283)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".5"></stop><stop offset=".141" stop-color="#fff" stop-opacity=".429"></stop><stop offset=".999" stop-color="#fff" stop-opacity="0"></stop></radialGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWx_bY5t0noHcfXn_gr24)" d="M30.428,14.886c0.237,0.237-1.402,0.537-2.556,1.691c-1.154,1.154-1.386,2.725-1.623,2.488	c-0.237-0.237-0.643-1.902,0.796-3.341C28.327,14.442,30.192,14.649,30.428,14.886z"></path><linearGradient id="0fNVDNBGs8zFiB7cDozbWy_bY5t0noHcfXn_gr25" x1="25.679" x2="45.194" y1=".664" y2="15.059" gradientTransform="translate(-.15 -.062)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".8"></stop><stop offset=".794" stop-color="#fff" stop-opacity="0"></stop></linearGradient><path fill="url(#0fNVDNBGs8zFiB7cDozbWy_bY5t0noHcfXn_gr25)" d="M33.62,9.577c1.656-0.745,3.595-1.354,5.875-1.68c0,0-3.324-0.866-7.277,0.279L33.62,9.577z"></path>
                            </svg>
                    </div>
                    <div className="">
                            <Link>
                                <h3 className="font-bold">Getting started</h3>
                                <p className="text-sm">Learn how <i>Gizebet</i> Works</p>
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-x-4 items-center hover:shadow-5 p-2 rounded-lg transition duration-300 ease-in-out">
                    <div className="bg-slate-200 p-1 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                        <linearGradient id="VPOdc88HXLi8UTIsE~~tLa_YSdQbX213JrZ_gr1" x1="12.686" x2="35.58" y1="4.592" y2="41.841" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"></stop><stop offset="1" stop-color="#0a85d9"></stop></linearGradient><path fill="url(#VPOdc88HXLi8UTIsE~~tLa_YSdQbX213JrZ_gr1)" d="M42,8H6c-1.105,0-2,0.895-2,2v26c0,1.105,0.895,2,2,2h8v7.998	c0,0.891,1.077,1.337,1.707,0.707L24.412,38H42c1.105,0,2-0.895,2-2V10C44,8.895,43.105,8,42,8z"></path><path d="M23.452,12c-1.848,0-4.147,0.935-5.167,1.395c-0.326,0.147-0.53,0.469-0.53,0.826v4.551	c0,0.574,0.671,0.881,1.104,0.505c0.957-0.831,2.45-1.821,4.131-1.821c0.495,0,1.085,0.156,1.085,0.899	c0,1.961-3.945,2.66-3.945,6.821c0,0.548,0.259,1.506,0.434,2.089c0.088,0.293,0.356,0.495,0.663,0.494l4.304-0.011	c0.495-0.001,0.838-0.528,0.598-0.961c-0.273-0.492-0.377-1.018-0.377-1.214c0-0.792,0.388-1.335,1.411-2.202	c1.301-1.103,3.083-2.613,3.083-5.597C30.245,14.159,27.706,12,23.452,12z" opacity=".05"></path><path d="M18.646,13.732c0.897-0.443,2.781-1.232,4.806-1.232c4.987,0,6.293,3.046,6.293,5.276	c0,2.734-1.593,4.102-2.879,5.192c-0.848,0.719-1.424,1.257-1.64,1.971c-0.079,0.261-0.06,0.715,0.109,1.144	c0.204,0.516,0.745,1.173-0.529,1.173l-3.283,0.005c-0.332,0-0.524-0.187-0.577-0.37c-0.103-0.353-0.231-0.883-0.278-1.38	c-0.022-0.235-0.03-0.456-0.019-0.648c0.221-3.694,3.926-4.187,3.926-6.507c0-0.692-0.413-0.97-0.809-1.124	c-0.595-0.233-1.284-0.19-1.668-0.099c-0.933,0.222-1.773,0.599-2.423,1.027c-0.451,0.297-0.987,0.271-1.149,0.101	c-0.114,0.083-0.272-0.509-0.272-0.65v-3.127c0-0.06,0.016-0.245,0.033-0.3C18.346,13.995,18.46,13.824,18.646,13.732z" opacity=".07"></path><path d="M23.332,28.026c-1.57,0-3.24,1.043-3.24,2.975c0,1.948,1.67,2.999,3.24,2.999	c1.887,0,3.204-1.233,3.204-2.999C26.536,29.048,24.924,28.026,23.332,28.026z" opacity=".05"></path><path d="M23.332,33.5c-1.33,0-2.74-0.865-2.74-2.499c0-1.626,1.433-2.475,2.74-2.475	c1.318,0,2.704,0.803,2.704,2.475C26.036,32.579,24.82,33.5,23.332,33.5z" opacity=".07"></path><path fill="#fff" d="M21.407,26.761c-0.088-0.229-0.277-0.91-0.277-1.583c0-3.832,3.945-3.979,3.945-6.821 c0-1.789-1.768-1.9-2.085-1.9c-2.008,0-3.576,1.148-4.235,1.728v-3.971C19.433,13.809,20.982,13,23.452,13 c5.72,0,5.792,3.932,5.792,4.776c0,4.539-4.684,4.875-4.684,7.784c0,0.607,0.22,1.051,0.317,1.201H21.407z M23.332,33 c-1.089,0-2.24-0.679-2.24-1.999c0-1.32,1.196-1.975,2.24-1.975c1.044,0,2.204,0.585,2.204,1.975 C25.536,32.391,24.421,33,23.332,33z"></path>
                    </svg>
                    </div>
                    <div className="">
                            <Link>
                                <h3 className="font-bold">Help Center</h3>
                                <p className="text-sm text-gray">Learn and get support!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </AuthenticatedLayout>
  );
}