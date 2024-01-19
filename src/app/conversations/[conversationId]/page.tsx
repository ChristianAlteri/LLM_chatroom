import getConversationsbById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import DetailSection from "./components/DetailSection";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventDetails from "@/app/actions/getEventDetails";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationsbById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const currentUser = await getCurrentUser()
  const eventDetails = await getEventDetails(params.conversationId)

  // empty state
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <DetailSection conversation={conversation} currentUser={currentUser!} eventDetails={eventDetails!}  />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
