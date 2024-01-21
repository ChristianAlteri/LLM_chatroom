"use client";

import axios from "axios";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";
import Button from "@/app/components/Buttons/Button";
import AddFriendButton from "@/app/components/Buttons/AddFriendButton";

interface UserBoxProps {
  data: User
  addFriend?: boolean
  showEmail?: boolean
}

const UserBox: React.FC<UserBoxProps> = ({ 
  data,
  addFriend,
  showEmail,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  

  const handleClick = useCallback(() => {
    setIsLoading(true);
    console.log('UserBox post data: ', data);
    axios.post('/api/conversations', { userId: data.id })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && (
        <LoadingModal />
      )}
      <div
        onClick={handleClick}
        className="
        w-full
        flex
        flex-row
        space-x-3
        bg-slate-50
        p-3
        hover:bg-blue-50
        hover:border
        hover:border-slate-500
        hover:shadow-xl
        rounded-lg
        transition
        cursor-pointer
        "
        >
          <Avatar  user={data} />
              <div className="min-w-0 flex-1">
                  <div className="focus-outline-none">
                      <div
                      className="
                          flex
                          flex-row
                          justify-between
                          items-center
                          mb-1
                      "
                      >
                          <p 
                          className="
                              m-1
                              text-sm
                              font-medium
                              text-slate-700
                              hover:text-black
                              hover:underline
                          "
                          >
                              {data.name}
                          </p>
                      {/* If add friend is true */}
                      <div className="flex flex-col">
                        {addFriend && (
                          <div className="flex">
                            <AddFriendButton data={data} />
                          </div>
                        )}
                      </div>
                      </div>
                        {/* If show email is true */}
                        {showEmail && (
                        <ul className="flex flex-row m-1 justify-between text-xs text-slate-300  ">
                              <p className=""> {data.email}</p> 
                        </ul>)}
                  </div>
              </div>
      </div>
    </>
  );
}

export default UserBox;
