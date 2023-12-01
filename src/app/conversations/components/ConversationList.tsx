"use client";

import clsx from "clsx";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MdGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";


interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationsList: React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {
    // setup initial state to manage items
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    return ( 
        <>
        <GroupChatModal 
            users={users}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
            <aside
            className={clsx(`
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
            `,
                isOpen ? 'hidden' : 'block w-full left-0'
            )}
            >
                <div className="px-5" >
                    <div className="flex flex-row justify-between items-center mb-4 pt-4 ">
                        <div className="
                        text-2xl
                        font-bold
                        text-slate-800
                        py-5
                        ">
                            Groups 
                        </div>
                            <div onClick={() => setIsModalOpen(true)}
                                className="
                                rounded-lg
                                p-2
                                bg-blue-50
                                text-slate-800
                                cursor-pointer
                                hover:bg-blue-100
                                hover:border
                                hover:border-slate-500
                                transition
                                ">
                                    <MdGroupAdd size={20} />
                            </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                        />
                    ))}
                </div>


            </aside>
        </>
     );
}
 
export default ConversationsList;