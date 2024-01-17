'use client'

import getCurrentUser from "@/app/actions/getCurrentUser";
import getMessages from "@/app/actions/getMessages";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface SummaryProps {
    data: Conversation;
    // messages: FullConversationType[];
    currentUser: User
    unseenMessages: any
  }
  
  const Summary: React.FC<SummaryProps> = ({
    data,
    // messages,
    currentUser,
    unseenMessages,
  }) => {
    const router = useRouter();

    // Re routes back to the conversation
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
      }, [data.id, router]);

      // we need all the messages from the conversation
      console.log("User", currentUser, "CONVO", data, "Unseen msgs: ",unseenMessages);

    return ( 
        <div className="flex-1 overflow-y-auto bg-slate-100">
            <button
            onClick={handleClick}
            className="flex w-full justify-end p-5"
            >X
            </button>
            <div className="flex flex-row justify-center">Summary</div>
        </div>
     );
}
 
export default Summary;