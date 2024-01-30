import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
  eventDetailsId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {

    try {
      const { conversationId, eventDetailsId } = params;
      const currentUser = await getCurrentUser();
  
      if (!currentUser?.id) {
        return NextResponse.json(null);
      }
  
      const eventDetails = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          eventDetails: {
            where: {
              id: eventDetailsId
            }
          },
        },
      });
  
      return NextResponse.json(eventDetails, { status: 200 });
    } catch (error: any) {
        // Log the error to the console
        console.error("Error occurred:", error);
    
        // You can log more contextual information if needed
        console.error("Request params:", params);
    
        // Return a generic internal server error response
        return new NextResponse("InternalError", { status: 500 });
    }
  }
  