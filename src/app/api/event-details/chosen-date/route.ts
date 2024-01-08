import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventDetails from "@/app/actions/getEventDetails";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { parseISO } from 'date-fns';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, conversationId, date, eventDetailsId } = body;
    const eventDetails = await getEventDetails(conversationId);

    // Add chosen date to eventDetails
    const updatedChosenDate = await prisma.eventDetails.update({
      where: { id: eventDetails!.id },
      data: {
        chosenDate: date
      }
    });


    return NextResponse.json(updatedChosenDate, { status: 200 });
  } catch (error: any) {
    console.error(error, "ERROR_MESSAGES");
    return new NextResponse("InternalError", { status: 500 });
  }
}
