import prisma from "@/app/libs/prismadb";

const getEventDetails = async (conversationId: any) => {
  try {
    const eventDetails = await prisma.eventDetails.findUnique({
      where: {
        conversationId: conversationId
      },
      include: {
        reminders: {
          include: {
            user: true,
          }
        },
        potentialDates: {
          include: {
            user: true,
          }
        }
      }
    });
    // console.log("Fetched eventDetails:", eventDetails);

    return eventDetails;
  } catch (error: any) {
    console.error("Error fetching event details:", error);
    return null;
  }
};

export default getEventDetails;