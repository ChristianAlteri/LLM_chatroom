import prisma from "@/app/libs/prismadb";
import { PrismaClient, Prisma } from "@prisma/client";

const prismaNew = new PrismaClient();


const getUnseenMessages = async (
    conversationId: string,
    currentUser: string
) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return messages;
    } catch (error: any) {
        return [];
    }
}

export default getUnseenMessages;
