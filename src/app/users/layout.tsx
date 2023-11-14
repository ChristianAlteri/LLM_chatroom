import Sidebar from "../components/sidebar/Sidebar";

export default async function UsersLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
        // @ts-ignore
        <Sidebar >  
            <div className="h-full bg-green-700">{children}</div>
        </Sidebar>  
    )
}