"use client";

import Avatar from "@/app/components/Avatar";
import { Conversation, User } from "@prisma/client";
import HomeCard from "./HomeCard";
import { FullConversationType } from "@/app/types";
import HomeNav from "./HomeNav";

interface HomeListProps {
  users: User[];
  allFriends: User[];
  conversations: FullConversationType[];
  //   conversations: Conversation & {
  //     users: User[];
  //   };
}

const HomeList: React.FC<HomeListProps> = ({
  users,
  allFriends,
  conversations,
}) => {
  return (
    <div className="px-5">
      <div className="flex flex-row justify-between items-center mb-4 pt-4">
        <div className="text-2xl font-bold text-slate-800 py-5">Home</div>
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
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />
                <HomeCard users={users} allFriends={allFriends} conversations={conversations} />


        </div>
      </div>
      {/* Bottom container */}
            <div className="flex flex-col m-4 pb-10">
                <div className="flex justify-center items-center bg-slate-300" style={{ height: '13vh' }}>
                Box
                </div>
                <div className="flex flex-row justify-center items-center gap-4 bg-blue-300" style={{ height: '7vh' }}>
                 <HomeNav />
                </div>
            </div>
    </div>
  );
};

export default HomeList;

{
  /* <div className="flex">
          <div className="flex flex-col w-full h-full bg-red-900 ">
            <div className="flex flex-row gap-2 justify-center items-center w-full h-2/">

              <div className="flex flex-row m-10 justify-center items-center h-fu w-full gap-8 overflow-auto">
                <div className="flex flex-row w-full items-center justify-center">
                  <div className="m-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8 p-1 ">

                      <HomeCard users={users} allFriends={allFriends} conversations={conversations}/>
                      <HomeCard users={users} allFriends={allFriends} conversations={conversations}/>
                      <HomeCard users={users} allFriends={allFriends} conversations={conversations}/>
                      <HomeCard users={users} allFriends={allFriends} conversations={conversations}/>
                      <HomeCard users={users} allFriends={allFriends} conversations={conversations}/>
                      <HomeCard users={users} allFriends={allFriends} conversations={conversations}/>
                      <HomeCard users={users} allFriends={allFriends} conversations={conversations}/>

                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row h-1/ justify-center items-center bg-slate-300 w-full">
              <div className="flex flex-row">Box</div>
            </div>

            <div className="flex flex-row h-1/ justify-center items-center bg-blue-300 w-full">
              <div className="flex flex-row">Search</div>
            </div>
          </div>
          </div> */
}
