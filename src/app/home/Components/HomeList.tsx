'use client'

import { User } from "@prisma/client";

interface HomeListProps {
    users: User[];
    allFriends: User[];
}

const HomeList: React.FC<HomeListProps> = ({
    users,
    allFriends,
}) => {
    
    return ( 
    <>
        <div className="flex flex-col gap-2 justify-center">
            <div className="flex flex-row">
                <div>Lets start populating this</div>
            </div>
        </div>
    </>
     );
}
 
export default HomeList;