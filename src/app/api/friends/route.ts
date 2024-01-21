import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { newFriendId } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch the current user's friendIds array
    const currentUserData = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { friendIds: true },
    });

    if (!currentUserData) {
      return new NextResponse('User not found', { status: 404 });
    }

    const currentFriendIds = currentUserData.friendIds || [];

    // Check if the newFriendId is not already in the friendIds array
    if (!currentFriendIds.includes(newFriendId)) {
      // Concatenate the newFriendId to the existing friendIds array
      const updatedFriendIds = [...currentFriendIds, newFriendId];

      // Update the user with the new friendIds array
      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          friendIds: updatedFriendIds,
        },
      });

      console.log('friend added', updatedUser);
      return NextResponse.json(updatedUser);
    } else {
      // Friend ID already exists in the array
      return new NextResponse('Friend ID already exists', { status: 400 });
    }
  } catch (error: any) {
    console.log(error, 'ERROR_SETTINGS_POST');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
