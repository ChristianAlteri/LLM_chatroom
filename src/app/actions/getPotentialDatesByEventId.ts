import prisma from "@/app/libs/prismadb";

const getPotentialDatesByEventId = async (eventDetailsId: string) => {
  try {
    const potentialDates = await prisma.potentialDate.findMany({
      where: {
        eventDetailsId: eventDetailsId
      }
    });

    // Uncomment the line below if you want to log the fetched potential dates
    // console.log("Fetched potential dates:", potentialDates);

    return potentialDates;
  } catch (error: any) {
    console.error("Error fetching potential dates:", error);
    return null;
  }
};

export default getPotentialDatesByEventId;
