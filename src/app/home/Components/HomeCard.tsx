"use client";
import Avatar from "@/app/components/Avatar";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";

interface HomeCardProps {
  users: User[];
  allFriends: User[]; 
  //   conversations: Conversation & {
  //     users: User[];
  //   };
  conversations: FullConversationType[];
  updateConversationId: (conversationId: string | null) => void;
}

const HomeCard: React.FC<HomeCardProps> = ({
  users,
  allFriends,
  conversations,
  updateConversationId,
}) => {
  // console.log(conversations);
  const name = conversations[0].name;
  const handleClick = (id: string | null) => {
    console.log("id", id);
    updateConversationId(id); 
  };

  return (
    <>
      <div className="flex items-center justify-center p-5" onClick={() => handleClick(conversations[0].id)}>
        <div className="flex justify-center items-center bg-slate-300 p-10 rounded-lg">
          <Avatar />
          <p>{name}</p>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
