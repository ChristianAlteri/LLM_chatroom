'use client'
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";

interface HomeCardProps {
  users: User[];
  allFriends: User[];
}

const HomeCard: React.FC<HomeCardProps> = ({
    users,
    allFriends,
}) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-slate-300 p-20">
      <Avatar />
    </div>
  );
};

export default HomeCard;
