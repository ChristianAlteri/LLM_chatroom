import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventDetails from "@/app/actions/getEventDetails";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { parseISO } from 'date-fns';

export async function POST(request: Request) {
  try {

    const body = await request.json();
    const { conversationId, eventDetailsId, createdAt, userId, name, reminder, note, completed } = body;  
    const eventDetails = await getEventDetails(conversationId);

    
    console.log("eventDetailsId", eventDetails?.id);
    console.log("BODY", body );
    // Add the new date to the potentialDates array
    const updatedReminders = await prisma.eventDetails.update({
      where: { id: eventDetails?.id},
      data: {
        reminders: {
          create: {
            userId,
            createdAt,
            name,
            reminder,
            note,
            completed,
          },
        },
      },
    });

      console.log("_UPDATED_EVENT_DETAILS", updatedReminders);
    return NextResponse.json(updatedReminders, { status: 200 });
  } catch (error: any) {
    console.error(error, "ERROR_MESSAGES");
    return new NextResponse("InternalError", { status: 500 });
  }
}
