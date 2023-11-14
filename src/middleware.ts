import { withAuth } from "next-auth/middleware";

// withAuth takes an options object as an argument. In this case, it specifies a configuration object with a pages property. The signIn property is set to '/', which means that if a user is not authenticated and tries to access a protected route, they will be redirected to the root ("/") to sign in.
export default withAuth({
  pages: {
    signIn: "/",
  },
});


// this states that any route that starts with /users/ will be protected by the withAuth middleware. 
export const config = {
  matcher: ["/users/:path*"]
};
