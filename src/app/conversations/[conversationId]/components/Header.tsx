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

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
    <ProfileDrawer
      data={conversation}
      isOpen={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      />
      <div
        className="
            bg-white 
            w-full 
            flex 
            border-b-[1px] 
            border-slate-200
            sm:px-3
            py-3
            px-4 
            lg:px-6 
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
          
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-xs font-light text-slate-500">
              {statusText}
            </div>
          </div>
        </div>
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
