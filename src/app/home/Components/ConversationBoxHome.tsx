"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

import clsx from "clsx";

import { FullConversationType, FullMessageType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxHomeProps {
  //   data: FullConversationType;
  conversationId: string | null;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  messages?: FullMessageType[];
}

const ConversationBoxHome: React.FC<ConversationBoxHomeProps> = ({
  //   data,
  conversationId,
  selected,
  onClick,
  className,
  messages,
}) => {
  const session = useSession();
  const router = useRouter();

  // Re routes to the conversation
  const handleClick = useCallback(() => {
    console.log(
      "Data passed",
      conversationId,
      selected,
      onClick,
      className,
      messages
    );
    router.push(`/conversations/${conversationId}`);
  }, [conversationId, router]);

  // Re routes to the conversation summary
  const handleClickCatchUp = useCallback(() => {
    router.push(`/conversations/${conversationId}/summary`);
  }, []);

  const lastMessage = useMemo(() => {
    // || so it doesn't break if msg empty
    const allMessages = messages || [];
    return messages![messages!.length - 1];
  }, [messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    return true;
  }, [lastMessage]);

  return (
    <div
      className="
    p-2
    "
    >
      
        <div className="min-w-0 flex-1 ">
          <div className="focus:outline-none ">
            <div
              className="
                flex
                justify-between
                items-center
                mb-1
                
                "
            ></div>
          </div>
        </div>
        <span
          onClick={handleClick}
          className="
              flex
              flex-row
              justify-end
                  text-xs 
                  p-1
                  text-slate-400 
                  hover:text-purple2-500 
                  hover:underline
                  hover:cursor-pointer
                "
        >
          Chat
        </span>
        {!hasSeen && (
          <span
            className="
                      flex
                      flex-row
                      justify-end
                          text-xs 
                          p-1
                          text-slate-400 
                          hover:text-purple2-500 
                          hover:underline
                          hover:cursor-pointer
                          "
            onClick={handleClickCatchUp}
          >
            Catch up
          </span>
        )}
      </div>

  );
};

export default ConversationBoxHome;
