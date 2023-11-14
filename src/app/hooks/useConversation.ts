import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  // grabbing the conversationId from the url
  const params = useParams();

  // memoizing the conversationId so that it doesn't change on every render
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  // This line uses useMemo to determine whether the conversation is considered open. It converts conversationId to a boolean using !! (double negation) and memoizes the result. The dependency array [conversationId] ensures that this calculation is only recomputed when the conversationId changes.
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
