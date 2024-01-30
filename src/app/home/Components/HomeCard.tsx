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
}

const HomeCard: React.FC<HomeCardProps> = ({
  users,
  allFriends,
  conversations,
}) => {
  // console.log(conversations);
  const name = conversations[3].name;

  return (
    <>
      <div className="flex items-center justify-center p-5" >
        <div className="flex justify-center items-center bg-slate-300 p-10 rounded-lg">
          <Avatar />
          <p>{name}</p>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
