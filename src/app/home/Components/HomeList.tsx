"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import HomeCard from "./HomeCard";

interface HomeListProps {
  users: User[];
  allFriends: User[];
}

const HomeList: React.FC<HomeListProps> = ({ users, allFriends }) => {
    return (
        <>
          <div className="flex flex-col w-full h-full bg-red-900 ">
            {/* Nav Bar */}
            <div className="flex flex-row h-1/8 justify-center items-center bg-blue-300 w-full ">
              <div className="flex flex-row">Home Header</div>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center w-full h-2/3">
              {/* Main */}
              <div className="flex flex-row m-10 justify-center items-center h-full w-full gap-8 overflow-auto">
                <div className="flex flex-row h-full w-full items-center justify-center">
                  <div className="m-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8 p-1 ">
                    {/* Cards */}

                      <HomeCard users={users} allFriends={allFriends} />
                      <HomeCard users={users} allFriends={allFriends} />
                      <HomeCard users={users} allFriends={allFriends} />
                      <HomeCard users={users} allFriends={allFriends} />
                      <HomeCard users={users} allFriends={allFriends} />
                      <HomeCard users={users} allFriends={allFriends} />
                      <HomeCard users={users} allFriends={allFriends} />

                  </div>
                </div>
              </div>
            </div>
            {/* Box */}
            <div className="flex flex-row h-2/6 justify-center items-center bg-slate-300 w-full">
              <div className="flex flex-row">Box</div>
            </div>
            {/* Footer */}
            <div className="flex flex-row h-1/6 justify-center items-center bg-blue-300 w-full">
              <div className="flex flex-row">footer</div>
            </div>
          </div>
        </>
      );
    };

export default HomeList;
