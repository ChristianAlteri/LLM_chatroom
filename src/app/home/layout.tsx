
import getFriends from "../actions/getFriends";
import getUsers from "../actions/getUsers";
// import Sidebar from "../components/sidebar/Sidebar";
import Sidebar from "../components/sidebar/Sidebar"
import HomeList from "./Components/HomeList";
import getConversations from "../actions/getConversations";
import HomeNav from "./Components/HomeNav";



export default async function HomeLayout({
    children,
} : {
    children: React.ReactNode;
}) {


    const users = await getUsers()
    const allFriends = await getFriends()
    const conversations = await getConversations();

    // console.log(users);
    return (
        // @ts-ignore
        <Sidebar >  
            <div className="h-full w-full bg-pink-900">
            
                <HomeList users={users} allFriends={allFriends} conversations={conversations}/>
                {/* {children} */}
                 {/* Bottom container */}
                <div className="absolute w-full flex-col justify-end xxs:bottom-14 sm:bottom-14 xs:bottom-14 md:bottom-14  lg:bottom-0 xl:bottom-0">
                    
                    {/* <div className="flex justify-center items-center bg-slate-300" style={{ height: '13vh' }}>
                    dashboard or preview
                    </div> */}
                    <div 
                    className="flex flex-row justify-center items-center gap-4 bg-blue-300" style={{ height: '7vh' }}>
                        <HomeNav />
                    </div>
                </div>
            </div>
        </Sidebar>  
    )
}