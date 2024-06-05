import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

//args: names and values of functions arguments,
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    name: v.string(),
    email: v.string(),
  },
  //Handler to populate the DB using the args of the function.
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      imageUrl: args.email,
      name: args.name,
      email: args.email,
    });
  },
});
//Function to create DB users.
