import getFriends from "../actions/getFriends";
import getUsers from "../actions/getUsers";
// import Sidebar from "../components/sidebar/Sidebar";
import Sidebar from "../components/sidebar/Sidebar"
import HomeList from "./Components/HomeList";


export default async function HomeLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    // essentially the same as if you where to write the prisma get request here
    const users = await getUsers()
    const allFriends = await getFriends()

    // console.log(users);
    return (
        // @ts-ignore
        <Sidebar >  
            <div className="h-full bg-white">
            
                <HomeList users={users} allFriends={allFriends} />
            
            </div>
        </Sidebar>  
    )
}