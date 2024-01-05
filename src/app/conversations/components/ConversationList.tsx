"use client";

import clsx from "clsx";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { MdGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "../../components/modals/GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";


interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationsList: React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {
    const session = useSession();
    const [items, setItems] = useState(initialItems);
    // console.log("conversations", items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const router = useRouter();

    const { conversationId, isOpen } = useConversation();


    // memoize the pusher key so we don't have to find it every time
    const pusherKey = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])


    /* setting up the various pusher services
        1. subscribe to the pusher channel which in this case is the email of the user
        2. set up the event handlers. These are the functions that will be called when the event is triggered
        3. bind the event handlers to the pusher client. essentially your listening to changes on this channel
        4. return a function that will be called when the component is unmounted. This will unsubscribe from the pusher channel and unbind the event handlers
    */
    useEffect(() => {
        if(!pusherKey) {
            return
        }

        pusherClient.subscribe(pusherKey)

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if(find(current, { id: conversation.id })) {
                    return current
                }

                return [conversation, ...current]
            })
        }

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }
                return currentConversation
            }))
        }

        const removeHandler = (conversation: FullConversationType) => {
                setItems((current) => {
                return [...current.filter((convo) => convo.id !== conversation.id)]
            })

            // console.log('Delete workingggggg');

            if (conversationId === conversation.id) {
                router.push('/conversations')
            }
        }

        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:remove', removeHandler)
        }

    }, [pusherKey, conversationId, router])

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