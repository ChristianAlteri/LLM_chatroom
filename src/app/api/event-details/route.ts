import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, conversationId, description } = body;

    const updatedEventDetails = await prisma.eventDetails.upsert({
      where: {
        conversationId,
      },
      update: {
        description,
      },
      create: {
        conversationId,
        description,
      },
      include: {
        conversation: true, 
      },
    } as {
      where: { conversationId: string };
      update: { description: string };
      create: { conversationId: string; description: string };
      include: { conversation: true };
    });
    const eventDetailsId = updatedEventDetails.id;

    // Link the Conversation with the event detail
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        eventDetailsId: eventDetailsId 
      },
    });

      // console.log("_UPDATED_EVENT_DETAILS", updatedConversation, updatedEventDetails);
    return NextResponse.json(updatedEventDetails, { status: 200 });
  } catch (error: any) {
    console.error(error, "ERROR_MESSAGES");
    return new NextResponse("InternalError", { status: 500 });
  }
}
