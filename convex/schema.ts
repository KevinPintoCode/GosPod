import { SearchFilter, defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// v. is the validator builder coming from Convex
export default defineSchema({
  //Define properties of each Podcasts
  podcasts: defineTable({
    user: v.id("users"),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.string(),
    audioStorageId: v.id("_storage"),
    imageUrl: v.string(),
    imageStorageId: v.id("_storage"),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
  })
    //provided by Convex, searchIndex expose the search result.
    .searchIndex("search_author", { searchField: "author" })
    .searchIndex("search_title", { searchField: "podcastTitle" })
    .searchIndex("search_body", { searchField: "podcastDescription" }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
  }),
});
