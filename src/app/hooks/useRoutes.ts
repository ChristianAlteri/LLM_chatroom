import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { TbLogout2 } from "react-icons/tb";
import { PiWechatLogoDuotone, PiUsersThreeBold, PiUsersDuotone } from "react-icons/pi";
import { TiHomeOutline } from "react-icons/ti";



import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: PiWechatLogoDuotone,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',

            icon: PiUsersThreeBold,
            active: pathname === '/users'
        },
        {
            label: 'Home',
            href: '/home',

            icon: TiHomeOutline,
            active: pathname === '/home'
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: TbLogout2,
        },
    ], [pathname, conversationId]);

    return routes
}

export default useRoutes; 