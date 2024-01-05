import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'eu',
    useTLS: true,
  });

  export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
      cluster: 'eu',
    }
  );







  
  // export const pusherClient = new PusherClient(
  //   process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  //   {
  //     // When pusher supports latest next version you can even create the auth.ts in your app/api instead of pages/api
  //     channelAuthorization: {
  //       endpoint: '/api/pusher/auth',
  //       transport: 'ajax',
  //     },
  //     cluster: 'eu',
  //   }
  // );