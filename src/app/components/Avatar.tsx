'use client'

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User;
} 

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {

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
                    src={user?.image || "/images/placeholder.jpg"}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
                >
                </Image> 
            </div>
            <span 
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
            />
        </div>
     );
}
 
export default Avatar;