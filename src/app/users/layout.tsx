import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./Components/UserList";

export default async function UsersLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    // essentiallty the same as if you where to write the prisma get request here
    const users = await getUsers()

    // console.log(users);
    return (
        // @ts-ignore
        <Sidebar >  
            <div className="h-full bg-white">
                <UserList items={users}/>
                {children}
            
            </div>
        </Sidebar>  
    )
}