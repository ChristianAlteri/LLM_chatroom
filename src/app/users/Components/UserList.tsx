'use client'

import { User } from "@prisma/client";
import UserBox from "./UserBox";
import SearchBar from "@/app/components/inputs/SearchBar";

interface UserListProps {
    items: User[];
};

const UserList: React.FC<UserListProps> = ({
    items,
}) => {
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
                        Contacts
                        <SearchBar
                        label="Search contacts by email"
                        id="search"
                        items={items}
                        >
                        </SearchBar> 
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox key={item.id} data={item} 
                    />
                ))}
            </div>


        </aside>
     );
}
 
export default UserList;