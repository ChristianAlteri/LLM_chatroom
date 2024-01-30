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
  updateName: (newName: string | null) => void;
}

const HomeCard: React.FC<HomeCardProps> = ({
  users,
  allFriends,
  conversations,
updateName,
}) => {
  // console.log(conversations);
  const name = conversations[3].name;
  const handleClick = (name: string | null) => {
    updateName(name); // Call updateName function with name parameter
  };

  return (
    <>
      <div className="flex items-center justify-center p-5" onClick={() => handleClick(conversations[3].name)}>
        <div className="flex justify-center items-center bg-slate-300 p-10 rounded-lg">
          <Avatar />
          <p>{name}</p>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
