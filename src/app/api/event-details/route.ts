import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, conversationId, eventDetails } = body;

    // Update EventDetails based on conversationId
    const updatedEventDetails = await prisma.eventDetails.upsert({
      where: {
        conversationId,
      },
      update: {
        eventDetails,
        conversation: {
          connect: { id: conversationId }, // Connect the EventDetails to the Conversation
        },
      },
      create: {
        conversationId,
        eventDetails,
        conversation: {
          connect: { id: conversationId }, // Connect the EventDetails to the Conversation
        },
      },
    } as {
      where: { conversationId: string };
      update: { eventDetails: string };
      create: { conversationId: string; eventDetails: string };
    });

    return NextResponse.json(updatedEventDetails);
  } catch (error: any) {
    console.error(error, "ERROR_MESSAGES");
    return new NextResponse("InternalError", { status: 500 });
  }
}
