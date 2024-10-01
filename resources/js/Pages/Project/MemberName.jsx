import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems  } from '@headlessui/react'

const MemberName = ({members, setData, task, handleAssignedSubmit}) => {
    const initialAssignedMember = members.find((member) => member.id === task.assigned);
    const [selectedMember, setSelectedMember] = useState(initialAssignedMember );

    useEffect(() => {
        handleAssignedSubmit(); // Submit the form after the value has been set
    }, [selectedMember]);
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
    <div>
      {/* Display the selected member's first name as the button label */}

      <MenuButton className="inline-flex w-full justify-between items-center border rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
        {selectedMember ? (<span><span className='text-white text-xs p-[6px] rounded-full font-bold bg-green-500 mr-2'>{selectedMember.name.substring(0,2)}</span>{selectedMember.name.split(" ")[0]}</span>): <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<linearGradient id="SVGID_1__ScJCfhkd77yD_gr1" x1="29.689" x2="18.311" y1="7.857" y2="19.235" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#60affe"></stop><stop offset=".033" stop-color="#6ab4fe"></stop><stop offset=".197" stop-color="#97cbfe"></stop><stop offset=".362" stop-color="#bddeff"></stop><stop offset=".525" stop-color="#daecff"></stop><stop offset=".687" stop-color="#eef7ff"></stop><stop offset=".846" stop-color="#fbfdff"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><circle cx="24" cy="13.546" r="8.046" fill="url(#SVGID_1__ScJCfhkd77yD_gr1)"></circle><linearGradient id="SVGID_00000139257311853942507350000017824593529916478390__ScJCfhkd77yD_gr2" x1="32.211" x2="15.789" y1="25.899" y2="42.321" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#60affe"></stop><stop offset=".033" stop-color="#6ab4fe"></stop><stop offset=".197" stop-color="#97cbfe"></stop><stop offset=".362" stop-color="#bddeff"></stop><stop offset=".525" stop-color="#daecff"></stop><stop offset=".687" stop-color="#eef7ff"></stop><stop offset=".846" stop-color="#fbfdff"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><path fill="url(#SVGID_00000139257311853942507350000017824593529916478390__ScJCfhkd77yD_gr2)" d="M34.228,29.5H13.772	c-2.152,0-3.896,1.791-3.896,4c0,12,28.248,12,28.248,0h0.001C38.125,31.291,36.38,29.5,34.228,29.5z"></path><path fill="none" stroke="#2e9bfe" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="5" stroke-width="3" d="M21.388,5.909C22.211,5.643,23.089,5.5,24,5.5c4.694,0,8.5,3.806,8.5,8.5s-3.806,8.5-8.5,8.5	s-8.5-3.806-8.5-8.5"></path><path fill="none" stroke="#2e9bfe" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M32.191,29.5h2.31c2.209,0,4,1.791,4,4v0H38.5c0,12-29,12-29,0v0c0-2.209,1.791-4,4-4h11.798"></path>
</svg>} {/* First name */} {selectedMember ? "" : <span>Assign</span>}
        <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </MenuButton>
    </div>

    <MenuItems className="absolute mt-2 w-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-red-300 z-10">
      {/* <div className="py-1"> */}
        {members.map((member, index) => (
          <MenuItem key={index}>
                {({ close }) => (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setData('assigned', parseInt(member.id));
                  setSelectedMember(member);
                //   handleAssignedSubmit();
                  close(); // Manually close the menu
                }}
                className={`block px-4 py-2 text-sm text-gray-700 w-full  text-left bg-slate-300 z-100 hover:bg-slate-400 transition duration-400 ease-in-out`}
              >
                <span className='w-2 h-2 rounded-full bg-green-700'>.</span> {member.name.split(" ")[0]} {/* Display first name */}
              </button>)}
          </MenuItem>
        ))}
        <MenuItem>
        {({ close }) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                setData('assigned', null);
                setSelectedMember(null);
                // handleAssignedSubmit();
                close(); // Manually close the menu
              }}
              className="block px-4 py-2 text-sm text-red-700 w-full text-left bg-red-200 z-100"
            >
            <span className='w-2 h-2 rounded-full bg-red-700'>.</span>  Revoke
            </button>
          )}
        </MenuItem>
    </MenuItems>
  </Menu>
  );
};

export default MemberName;
