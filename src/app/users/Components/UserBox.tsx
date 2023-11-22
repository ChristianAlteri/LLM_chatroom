"use client";

import axios from "axios";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "@/app/components/Avatar";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading;

    axios.post('/api/conversations', { userId: data.id })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`);
    })
    .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div 
    onClick={handleClick}
    className="
    w-full
    relative
    flex
    items-center
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
                    </div>
                </div>
            </div>
    </div>
  );
}

export default UserBox;
