'use client'

import { User } from "@prisma/client";
import Image from "next/image";
// import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User;
} 

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {

    // const { members } = useActiveList();
    // const isActive = members.indexOf(user?.email!) !== -1;


    return ( 
        <div className="relative">
            <div
            className="
            relative
            inline-block
            rounded-full
            overflow-hidden
            h-8
            w-8
            md:h-9
            md:w-9
            "
            >
                <Image 
                    alt="Avatar"
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
                    src={user?.image || "/images/placeholder.jpg"}
                >
                </Image> 
            </div>
            {/* {isActive && ( */}
                {/* <span 
                className="
                    absolute
                    block
                    rounded-full
                    bg-emerald-600
                    ring-2
                    ring-emerald-200 
                    top-0
                    right-0
                    h-2
                    w-2
                    md:h-3
                    md:w-3
                    "
                /> */}
            {/* )} */}
        </div>
     );
}
 
export default Avatar;