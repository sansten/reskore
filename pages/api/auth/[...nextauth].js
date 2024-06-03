import NextAuth from 'next-auth'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
//import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID || "863lgpm5m9c7mc",
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "WPL_AP0.ZTzthstKwtpFUK6d.MzM4NTc1NjMzNg==",
        client: { token_endpoint_auth_method: "client_secret_post" },
        issuer: "https://www.linkedin.com/oauth",
        redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/linkedin`,  
        profile: (profile) => ({
          id: profile.sub,
          name: profile.name,
          email: profile.email
       }),
       token: {
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
      },
        wellKnown:
          "https://www.linkedin.com/oauth/.well-known/openid-configuration",
        authorization: {
          url: 'https://www.linkedin.com/oauth/v2/authorization',
          params: {
            scope: "openid profile email",
          },
        },
      }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
 
})

