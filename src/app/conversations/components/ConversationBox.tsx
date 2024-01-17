"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { format } from "date-fns";
import axios from "axios";

import clsx from "clsx";

import { Conversation, Message, User } from "@prisma/client";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();


  // Re routes to the conversation 
  const handleClick = useCallback(() => {
    console.log('Data passed', data);
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

 // Re routes to the conversation summary
  const handleClickCatchUp = useCallback(() => {
    // console.log('Catch up clicked', data);
    router.push(`/conversations/${data.id}/summary`);
  }, []);


  const lastMessage = useMemo(() => {
    // || so it doesn't break if msg empty
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.data?.user?.email,
  [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'New chat created';
  }, [lastMessage]);


  return (
    <div className="
    p-2
    ">
    <div
      onClick={handleClick}
      className={clsx(`
    w-full
    relative
    flex
    items-center
    space-x-2
    bg-slate-100
    p-4
    hover:bg-blue-50
    hover:shadow-xl
    hover:border
    hover:border-slate-500
    rounded-lg
    transition
    cursor-pointer 
    `,
        selected ? "bg-blue-200" : "bg-slate-50"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div
            className="
                flex
                justify-between
                items-center
                mb-1
                
                "
          >
            <p
              className="
                m-1
                text-sm
                font-medium
                text-slate-700
                hover:text-black
                "
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
                <p
                    className="
                    text-xs
                    text-slate-500
                    font-light
                    "
                >

                    {format(new Date(lastMessage.createdAt), 'p')}
                </p>
            )}
          </div>
          <p
          className={clsx(`
          truncate
          text-xs
          text-slate-900
            p-1
            rounded-md
          `,
          hasSeen ? "text-slate-300" : "text-black font-bold"
          )}
          >
                {lastMessageText}
          </p>
        </div>
      </div>
    </div>
    {!hasSeen && (
              <span 
                className="
                text-xs 
                p-1
                text-slate-300 
                hover:text-black 
                hover:underline"
                onClick={handleClickCatchUp}
                >
                  Catch up
              </span>
            )}
    </div>
  );
};

export default ConversationBox;
