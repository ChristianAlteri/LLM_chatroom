"use client";

import Avatar from "@/app/components/Avatar";
import { Conversation, User } from "@prisma/client";
import HomeCard from "./HomeCard";
import { FullConversationType } from "@/app/types";
import HomeNav from "./HomeNav";
import { useEffect, useRef, useState } from "react";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import ConversationBoxHome from "./ConversationBoxHome";
import EmptyState from "@/app/components/EmptyState";
import EmptyConversationBox from "./EmptyConversationBox";

interface HomeListProps {
  users: User[];
  allFriends: User[];
//   eventDetailsAndConversations: Conversation & {
//       users: User[];
//     };
    conversations: FullConversationType[];
}

const HomeList: React.FC<HomeListProps> = ({
  users,
  allFriends,
  conversations,
//   eventDetailsAndConversations
}) => {
    const [clickedConversationid, setId] = useState("");
    const conversationRef = useRef<HTMLDivElement>(null);
    


  // Function to update the name state
  const updateConversationId = (conversationId: string | null) => {
    setId(conversationId!);

  };

//   const filteredConversations = conversations.filter(
//     (conversation) => conversation.id === clickedConversationid
//   );



  return (
    <div
        className="
        pb-20
        mb-20
        shadow-2xl
        block
        w-full
        ">
    <div className="px-5">
      <div className="flex flex-row justify-between items-center mb-4 pt-4">
        <div className="text-2xl font-bold text-slate-800 py-5">Home</div>
        <div>Pin to top</div>
        {/* Sort by selector */}
        <div className="flex text-left">
          <select className="border border-slate-500 text-xs p-1 rounded leading-tight focus:outline-none focus:border-slate-900">
            <option>Upcoming Events</option>
            <option>Unread Messages</option>
            <option>Created At</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        {/* Card container */}
        <div className="border grid items-center justify-center xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4  overflow-y-auto" style={{ height: '66vh' }}>
        {conversations.map((conversation, index) => (
            <HomeCard 
                key={index} // Make sure to include a unique key for each component
                users={users} 
                allFriends={allFriends} 
                conversations={conversations} 
                updateConversationId={updateConversationId}
                name={conversation.name}
                id={conversation.id}
                messages={conversation.messages}
                eventDetailsId={conversation.eventDetailsId}

                // description={conversation.description}
                // location={conversation.location}
            />
        ))}
        </div>
            <div className="absolute w-full flex-col justify-end xxs:bottom-36 sm:bottom-36 xs:bottom-36 md:bottom-36 lg:bottom-20 xl:bottom-20">
                <div ref={conversationRef} className="flex flex-row justify-center items-center bg-slate-300 overflow-x-auto" style={{ height: '13vh' }}>
                <div className="flex flex-row justify-between items-center gap-4">
                    <div>Calendar of chosen dates</div>
                    {/* {filteredConversations && filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation, index) => (
                        <ConversationBoxHome key={index} data={conversation} />
                    ))
                    ) : (
                        // This could be anything 
                    <div>
                        <EmptyConversationBox />
                    </div>
                    )} */}
                </div>
                </div>
            </div>
      </div>
    </div>
    </div>
  );
};

export default HomeList;

