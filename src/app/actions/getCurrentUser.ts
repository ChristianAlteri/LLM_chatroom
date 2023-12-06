import prisma from '@/app/libs/prismadb';   
import getSession from './getSession';

const getCurrentUser = async () => {
    try {
        const session = await getSession();
        // console.log("current session: ", session); 

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma?.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })
        // console.log('currentUser: ', currentUser);

        if (!currentUser) {
            return null;
        }

        return currentUser;

    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser;