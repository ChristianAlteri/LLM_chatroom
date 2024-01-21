'use client'

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import SearchBar from "@/app/components/inputs/SearchBar";
import { use, useEffect, useState } from "react";

interface UserListProps {
    items: User[];
    allFriends: User[];
    
};

const UserList: React.FC<UserListProps> = ({
    items,
    allFriends,
}) => {

    // const [friends, setFriends] = useState<User[]>([]);

    // useEffect(() => {
    //     // filteresFriends = items.filter((item))
    //     setFriends(items);
    //     console.log('Friends', friends);
    // },[friends]);

    return ( 
        <aside
        className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-l
        border-slate-300
        shadow-2xl
        block
        w-full
        left-0
        ">
            <div className="px-5" >
                <div className="flex-col">
                    <div className="
                    text-2xl
                    font-bold
                    text-slate-800
                    py-5
                    ">
                        Friends
                        <SearchBar
                        label="Search contacts by email"
                        id="search"
                        items={items}
                        >
                        </SearchBar> 
                    </div>
                </div>

                {/* {items.map((item) => (
                    <UserBox key={item.id} data={item} 
                    />
                ))} */}
                {allFriends.map((friend) => (
                    <UserBox key={friend.id} data={friend} 
                    />
                ))}
            </div>


        </aside>
     );
}
 
export default UserList;