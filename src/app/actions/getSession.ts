import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { authOptions } from '@/app/libs/authOptions';
// import { get } from "http";

export default async function getSession() {
    // console.log('AUTH', authOptions);
    return await getServerSession(authOptions);
}

// (async () => {
//     const session = await getSession();
//     console.log(session);
// })();

// getSession().then(session => {
//     console.log(session);
// });