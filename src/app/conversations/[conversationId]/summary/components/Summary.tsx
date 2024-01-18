"use client";

import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { CgCloseR } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";

interface SummaryProps {
  data: Conversation;
  currentUser: User;
  unseenMessages: any;
}

const Summary: React.FC<SummaryProps> = ({
  data,
  currentUser,
  unseenMessages,
}) => {
  const router = useRouter();

  const [messagesToCatchUpOn, setMessagesToCatchUpOn] = useState<string[]>([]);
  const [generatedSummary, setGeneratedSummary] = useState<string[]>([]);
  const [generatedSummaries, setGeneratedSummaries] = useState<string[]>([]);

  useEffect(() => {
    console.log("unseenMessages in useEffect", unseenMessages);
    const filteredMessages = unseenMessages.filter(
      //@ts-ignore
      (message) => !message.seenIds.includes(currentUser.id)
    );
    const filteredMessageBodies = filteredMessages.map(
      //@ts-ignore
      (message) => message.body
    );
    const messageBodies = filteredMessageBodies.join("\n");
    setMessagesToCatchUpOn(messageBodies);
    console.log("messagesToCatchUpOn in useEffect", messagesToCatchUpOn);
  }, [unseenMessages, currentUser.id, messagesToCatchUpOn]);

//   Catch up summary call
  useEffect(() => {
    if (messagesToCatchUpOn.length) {
      const fetchDataFromOpenAI = async () => {
          console.log("messagesToCatchUpOn in API call", messagesToCatchUpOn);
          try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            messages: [
              {
                role: "system",
                content:
                  "You are an intelligent assistant designed to efficiently process and output JSON summaries. Your primary function is to understand and interpret messages, generating clear and concise JSON-formatted responses that summarize relevant information.",
              },
              {
                role: "user",
                content: `Generate a concise summary of these messages ${messagesToCatchUpOn}.`,
              },
            ],
            model: "gpt-3.5-turbo-1106",
            // response_format: { type: "json_object" },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
          }
        );

        const generatedSummary = response.data.choices[0].message.content;
        console.log("Generated response from OpenAI:", response.data);
        setGeneratedSummaries((prevSummaries) => [
          ...prevSummaries,
          generatedSummary,
        ]);

        
        // console.log("Generated text from OpenAI:", generatedSummary);
      } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
      }
    };

    fetchDataFromOpenAI();
}
  }, [messagesToCatchUpOn]);

  // Re routes back to the conversation
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  return (
    <div className="flex flex-col h-full w-full justify-center ">
      <div className="flex-1 overflow-y-auto  bg-slate-100">
        <div className="flex gap-6 p-4 h-full w-full justify-center">
          <div className="flex bg-white p-4 border rounded-lg border-slate-900 flex-col gap-2">
            <div className="flex items-center gap-2">
                {/* Close button */}
                    <button
                        onClick={handleClick}
                        className="flex 
                        absolute
                        right-6
                        flex-col 
                        items-end
                        rounded-md 
                        text-slate-500 
                        hover:text-black
                        
                        "
                    >
                        <span className="sr-only">Close</span>
                                    <IoIosClose 
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                    />
                    </button>
              <div className="text-xs font-semibold text-slate-500">
                Summary
              </div>
              <div
                style={{ fontSize: "10px" }}
                className="text-xs text-slate-300"
              >
                {format(new Date(), "HH:mm a")}
              </div>
            </div>
            <div className="text-sm w-fit overflow-hidden ">
              {generatedSummaries.map((summary, index) => (
                <div key={index}>- {summary}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
