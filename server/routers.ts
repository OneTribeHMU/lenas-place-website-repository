import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getUpcomingEvents, createNewsletterSignup, createContactSubmission, getUserMembership } from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  events: router({
    getUpcoming: publicProcedure.query(async () => {
      return await getUpcomingEvents();
    }),
  }),

  newsletter: router({
    signup: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().optional(),
          phone: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createNewsletterSignup({
            email: input.email,
            name: input.name,
            phone: input.phone,
            subscribed: 1,
            source: "website",
          });
          return { success: true, message: "Successfully subscribed to newsletter!" };
        } catch (error) {
          console.error("Newsletter signup error:", error);
          throw new Error("Failed to subscribe to newsletter");
        }
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone,
            subject: input.subject,
            message: input.message,
            read: 0,
          });
          return { success: true, message: "Your message has been sent successfully!" };
        } catch (error) {
          console.error("Contact submission error:", error);
          throw new Error("Failed to submit contact form");
        }
      }),
  }),

  membership: router({
    getUserMembership: protectedProcedure.query(async ({ ctx }) => {
      if (!ctx.user?.id) return null;
      return await getUserMembership(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
