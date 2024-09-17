import React from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

function PopOvers({members}) {
  return (
    <Popover className="relative ">
        <PopoverButton>
            <div className="flex items-center space-x-[-10px]"> {/* Adjust the space-x value to control the overlap */}
                {members.slice(0, 3).map((member, index) => (
                    <div
                        key={index}
                        className={`text-white p-[5px] px-[7px] rounded-full font-bold ${index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'} transform`}
                        style={{ zIndex: members.length - index }} // Ensures proper layering
                    >
                        {member.name.substring(0, 2)}
                    </div>
                ))}
                {members.length > 3 && (
                    <div className="text-white p-[5px] rounded-full font-bold bg-[#babab7] transform" style={{ zIndex: 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M 6 10 A 2 2 0 0 0 4 12 A 2 2 0 0 0 6 14 A 2 2 0 0 0 8 12 A 2 2 0 0 0 6 10 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z M 18 10 A 2 2 0 0 0 16 12 A 2 2 0 0 0 18 14 A 2 2 0 0 0 20 12 A 2 2 0 0 0 18 10 z"></path>
                        </svg>
                    </div>
                )}
            </div>
        </PopoverButton>
        <PopoverPanel anchor="bottom" className="flex flex-col ">
        <div className="mt-2 border-[1px] border-[#afaeae] p-2 rounded-lg rounded-t-none border-t-0 z-99999 bg-white">
            {members.map((member, index) => (
                <div key={index} className="mb-2 flex flex-col">
                    <div className="font-bold text-[#444444]">{member.name}</div>
                    <div className="font-medium text-xs text-[#888888]">{member.email}</div>
                </div>
            ))}
        </div>
        </PopoverPanel>
    </Popover>
    )
}

export default PopOvers;
