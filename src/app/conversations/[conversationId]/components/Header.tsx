"use client";

import useOtherUser from "@/app/hooks/useOtherUser";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";

import { RiArrowLeftSLine } from "react-icons/ri";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import ProfileDrawer from "./ProfileDrawer";
import { set } from "date-fns";
// import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  // const { members } = useActiveList();
  // const isActive = members.indexOf(otherUser?.email!) !== -1;

  // const statusText = useMemo(() => {
  //   if (conversation.isGroup) {
  //     return `${conversation.users.length} members`;
  //   }

  //   // return isActive ? "Active" : "Offline";
  //   return "Active";
  // }, [conversation]);

  return (
    <>
    
    <ProfileDrawer
      data={conversation}
      isOpen={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      />
      
      <div
        className="
          bg-slate-100
            w-full 
            flex 
            border-b-[1px] 
            border-slate-400
            sm:px-3
            py-3
            px-3 
            lg:px-4
            justify-between 
            items-center 
            
          "
      >
        
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
                lg:hidden 
                block 
                text-slate-500 
                hover:text-black
                transition 
                cursor-pointer

              "
          >
            <RiArrowLeftSLine size={26} />
          </Link>
          
          {conversation.isGroup ? 
          (<AvatarGroup users={conversation.users}/>) : 
          (<Avatar user={otherUser} />) }
          
          <div className="flex p-1 flex-col text-slate-800 font-bold">
            <div>{conversation.name || otherUser.name}</div>
            {/* <div className="text-xs text-slate-100">
              {statusText}
            </div> */}
          </div>
        </div>

            {/* Put your other nav bar buttons here */}

        {/* <div>Calendar</div> */}

        <IoEllipsisHorizontalSharp
          size={26}
          onClick={() => setDrawerOpen(true)}
          className="
              text-slate-500
              cursor-pointer
              hover:text-black
              transition
            "
        />
      </div>
    </>
  );
};

export default Header;
