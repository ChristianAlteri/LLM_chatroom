import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          }
        },
        eventDetails: {
          include: {
            potentialDates: {
              include: {
                user: true,
              }
            }
          }
        }
      }
    });
    // console.log("conversations", conversations);
    return conversations;
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export default getConversations;