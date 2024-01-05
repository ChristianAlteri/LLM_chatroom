import getConversations from "../actions/getConversations"
import getUsers from "../actions/getUsers";

import Sidebar from "../components/sidebar/Sidebar"
import ConversationsList from "./components/ConversationList"


export default async function ConversationsLayout({
    children
} : {
    children: React.ReactNode
}) {
    const conversations = await getConversations();
    // console.log('conversations', conversations);
    const users = await getUsers();
    return (
        // @ts-ignore
        <Sidebar> 
            <div
                className="h-full"
            >
                <ConversationsList 
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}; 