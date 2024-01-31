"use client";
import Avatar from "@/app/components/Avatar";
import { FullConversationType, FullMessageType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import axios from "axios";
import { use, useEffect, useState } from "react";
import ConversationBoxHome from "./ConversationBoxHome";

interface HomeCardProps {
  users: User[];
  allFriends: User[];
  //   conversations: Conversation & {
  //     users: User[];
  //   };
  conversations: FullConversationType[];
  updateConversationId: (conversationId: string | null) => void;
  name?: string | null;
  id: string | null;
  eventDetailsId?: string | null; 
  messages?: FullMessageType[];
//   chosenDate?: string | null;
//   description?: string | null;
//   location?: string | null;
}

const HomeCard: React.FC<HomeCardProps> = ({
  users,
  allFriends,
  conversations,
  updateConversationId,
  name,
  id,
  eventDetailsId,
    messages,
//   chosenDate,
//   description,
//   location,
}) => {
    const [eventDetailsData, setEventDetailsData] = useState<any>([]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`api/event-details/${id}`);
                setEventDetailsData(response.data); 
                
            } catch (error) {
                console.log(error);
            }
        };
    
        if (id) {
            fetchEventDetails();
        }
    }, [id]); 

    useEffect(() => {
    }, [eventDetailsData]);

  const handleClick = (id: string | null) => {
    updateConversationId(id);
  };


  return (
    <>
      <div
        className="flex items-center justify-center p-5"
        onClick={() => handleClick(id)}
      >
        <div className="flex justify-center items-center bg-slate-300 p-10 rounded-lg">
          <Avatar />
          <p>{name}</p>
            <ConversationBoxHome key={id} conversationId={id} messages={messages}/>

          {/* <p>{chosenDate}</p>
          <p>{description}</p>
          <p>{location}</p> */}
        </div>
      </div>
    </>
  );
};

export default HomeCard;
