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
                seen: {
                    some: {
                        userId: {
                            not: currentUser
                        }
                    } as Prisma.UserWhereInput
                }
            },
            include: {
                sender: true,
                seen: true
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
