import getFriends from "../actions/getFriends";
import getUsers from "../actions/getUsers";
// import Sidebar from "../components/sidebar/Sidebar";
import Sidebar from "../components/sidebar/Sidebar"
import HomeList from "./Components/HomeList";
import getConversations from "../actions/getConversations";


export default async function HomeLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    // essentially the same as if you where to write the prisma get request here
    const users = await getUsers()
    const allFriends = await getFriends()
    const conversations = await getConversations();

    // console.log(users);
    return (
        // @ts-ignore
        <Sidebar >  
            <div className="h-full bg-pink-900">
            
                <HomeList users={users} allFriends={allFriends} conversations={conversations}/>
            
            </div>
        </Sidebar>  
    )
}