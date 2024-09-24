import { React, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import MembersEditDialog from "./MembersEditDialog";
import MembersDeleteDialog from "./MembersDeleteDialog";

function PopOvers({ members, project, role }) {
  const [isMembersEditDialogOpen, setIsMembersEditDialogOpen] = useState(false);
  const [isMembersDeleteDialogOpen, setIsMembersDeleteDialogOpen] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState();
  console.log(role);
  return (
    <>
      <Popover className="relative ">
        <PopoverButton>
          <div className="flex items-center space-x-[-10px]">
            {" "}
            {members.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className={`text-white p-[5px] px-[7px] rounded-full font-bold ${
                  index % 2 === 0 ? "bg-blue-500" : "bg-green-500"
                } transform`}
                style={{ zIndex: members.length - index }} // Ensures proper layering
              >
                {member.name.substring(0, 2)}
              </div>
            ))}
            {members.length > 3 && (
              <div
                className="text-white p-[5px] rounded-full font-bold bg-[#babab7] transform"
                style={{ zIndex: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M 6 10 A 2 2 0 0 0 4 12 A 2 2 0 0 0 6 14 A 2 2 0 0 0 8 12 A 2 2 0 0 0 6 10 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z M 18 10 A 2 2 0 0 0 16 12 A 2 2 0 0 0 18 14 A 2 2 0 0 0 20 12 A 2 2 0 0 0 18 10 z"></path>
                </svg>
              </div>
            )}
          </div>
        </PopoverButton>
        <PopoverPanel anchor="bottom" className="flex flex-col ">
          <div className="mt-2 border-[1px] border-[#afaeae] cursor-pointer w-[300px] divide-y-2 rounded-lg rounded-t-none border-t-0 z-100 bg-white p-4">
            {members.map((member, index) => (
              <div key={index} className="mb-2  flex flex-col group">
                <div className="font-bold flex justify-between items-center text-[#444444]">
                  <p className="lowercase">{member.name}</p>
                  <p className="text-primary">{member.role}</p>
                </div>
                <div className="font-medium text-xs text-[#888888]">
                  {member.email}
                </div>

                <div
                  className={`mt-4 ml-2 hidden  justify-start items-center ${
                    member.role === "owner" || role === "member"
                      ? "hidden"
                      : "group-hover:flex gap-x-5"
                  }`}
                >
                  <div
                    onClick={() => {
                      setIsMembersEditDialogOpen(true);
                      setSelectedMember(member);
                    }}
                    className={`group relative ${
                      role === "member" ? "hidden" : ""
                    }`}
                  >
                    <svg
                      className="size-3.5   fill-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                    </svg>
                    <p className="text-[10px] absolute opacity-0 -top-4 -left-2 font-bold w-15 text-primary group-hover:opacity-1 ">
                      edit role
                    </p>
                  </div>
                  <div
                    className={`group ${role === "owner" ? "" : "hidden"}`}
                    onClick={() => {
                      setIsMembersDeleteDialogOpen(true);
                      setSelectedMember(member);
                    }}
                  >
                    <svg
                      className="size-5 fill-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L353.3 251.6C407.9 237 448 187.2 448 128C448 57.3 390.7 0 320 0C250.2 0 193.5 55.8 192 125.2L38.8 5.1zM264.3 304.3C170.5 309.4 96 387.2 96 482.3c0 16.4 13.3 29.7 29.7 29.7l388.6 0c3.9 0 7.6-.7 11-2.1l-261-205.6z" />
                    </svg>
                  </div>
                </div>
                <MembersEditDialog
                  isMembersEditDialogOpen={isMembersEditDialogOpen}
                  setIsMembersEditDialogOpen={setIsMembersEditDialogOpen}
                  member={selectedMember}
                  project={project}
                />
                <MembersDeleteDialog
                  isMembersDeleteDialogOpen={isMembersDeleteDialogOpen}
                  setIsMembersDeleteDialogOpen={setIsMembersDeleteDialogOpen}
                  member={selectedMember}
                  project={project}
                />
              </div>
            ))}
          </div>
        </PopoverPanel>
      </Popover>
    </>
  );
}

export default PopOvers;
