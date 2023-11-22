import prisma from '@/app/libs/prismadb';
import  getCurrentUser  from './getCurrentUser';

const getConversationsbById = async (
    conversationId: string
) => {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser?.email){
            return null;
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        // console.log('Conversation: ', conversation);
        return conversation;

    } catch (error: any) {
        return null
    }
}

export default getConversationsbById;