"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
  //  result: seenList = 'user1, user2, user3'

  // All the message styling is dynamic based on the isOwn variable

  const container = clsx("flex gap-3 p-4 h-fit", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2 ", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden ",
    isOwn ? "rounded-xl font-bold bg-purple2-300 text-white" : "rounded-xl font-bold bg-slate-500 text-white",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold text-purple2-300">
            {data.sender.name}
          </div>
          <div style={{ fontSize: '10px'}} className="text-xs text-slate-300">
            {format(new Date(data.createdAt), 'HH:mm')}
          </div>
        </div>
        <div className={message}>
          {/* <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} /> */}
            <div>{data.body}</div>
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div 
            style={{ fontSize: '10px'}} 
            className="
            
            font-light 
            text-slate-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
