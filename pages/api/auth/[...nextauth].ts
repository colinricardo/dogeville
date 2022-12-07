import { PrismaAdapter } from "@next-auth/prisma-adapter";
import postmark, { EmailType } from "backend/services/postmark";
import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import prisma from "prisma/client";

const { SECRET } = process.env;

export const authOptions: NextAuthOptions = {
  secret: SECRET,
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
  },
  providers: [
    EmailProvider({
      server: {
        host: "smtp.postmarkapp.com",
        port: 25,
        auth: {
          user: "632ead34-2c94-4de7-bd62-da086b496332",
          pass: "632ead34-2c94-4de7-bd62-da086b496332",
        },
      },
      from: "team@dogeville.com",
      sendVerificationRequest({ identifier, url, provider }) {
        postmark.sendTransactionalEmail({
          to: identifier,
          emailType: EmailType.ONE_TIME_CODE,
          variables: {
            buttonUrl: url,
          },
          from: provider.from,
        });
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },

  adapter: PrismaAdapter(prisma),
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;
