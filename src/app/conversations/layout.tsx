import getConversations from "../actions/getConversations"
import getFriends from "../actions/getFriends";
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
    const allFriends = await getFriends()
    return (
        // @ts-ignore
        <Sidebar> 
            <div
                className="h-full"
            >
                <ConversationsList 
                    users={users}
                    allFriends={allFriends}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}; 