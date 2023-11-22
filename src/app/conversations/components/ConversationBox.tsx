"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { format } from "date-fns";
import clsx from "clsx";

import { Conversation, Message, User } from "@prisma/client";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

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

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    // || so it doesn't break if msg empty
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    const userSession = session?.data;
    console.log("logged in users data:", userSession);

    return session?.data?.user?.email;
    // using ?. so it doesn't break if session, data or user is empty
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageBody = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "No messages yet";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
    w-full
    relative
    flex
    items-center
    space-x-3
    bg-slate-50
    p-3
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
      <Avatar user={otherUser} />
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
          text-slate-700
            p-1
          `,
          hasSeen ? "text-slate-500" : "text-black font-medium"
          ) }
          >
                {lastMessageBody}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
