"use client";
import Avatar from "@/app/components/Avatar";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import axios from "axios";
import { use, useEffect, useState } from "react";

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
  eventDetailsId
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

        console.log('eventDetailsData', eventDetailsData);
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
          {/* <p>{chosenDate}</p>
          <p>{description}</p>
          <p>{location}</p> */}
        </div>
      </div>
    </>
  );
};

export default HomeCard;
