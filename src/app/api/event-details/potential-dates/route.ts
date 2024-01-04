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
    // const eventDetails = await getEventDetails(conversationId);
    
    const eventDetails = await getEventDetails(conversationId);
    
    
    console.log("BODY", body );
    // Add the new date to the potentialDates array
    const updatedPotentialDates = await prisma.eventDetails.update({
      where: { id: eventDetails!.id },
      data: {
        potentialDates: {
          create: {
            userId,
            date,
          },
        },
      },
    });

      console.log("_UPDATED_EVENT_DETAILS", updatedPotentialDates);
    return NextResponse.json(updatedPotentialDates, { status: 200 });
  } catch (error: any) {
    console.error(error, "ERROR_MESSAGES");
    return new NextResponse("InternalError", { status: 500 });
  }
}
