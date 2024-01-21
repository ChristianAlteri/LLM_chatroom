import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";
import getCurrentUser from "./getCurrentUser";

const getFriends = async () => {
  // Get the current user's session
  const session = await getSession();
  const currentUser = await getCurrentUser()

  // Check if the user is authenticated
  if (!session?.user?.email) {
    return [];
  }

  try {
    // Fetch the current user's friendIds
    const currentUsersFriends = await prisma.user.findUnique({
      where: {
        id: currentUser?.id,
      },
      // Select only the friendIds field
      select: {
        friendIds: true,
      },
    });

    // Check if the current user or their friendIds are not available
    if (!currentUser || !currentUser.friendIds) {
      return [];
    }

    // Fetch the friends whose IDs are in the current user's friendIds array
    const friends = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        id: {
          in: currentUser.friendIds,
        },
      },
    });

    return friends;
  } catch (error: any) {
    console.error(error);
    return [];
  }
};

export default getFriends;
