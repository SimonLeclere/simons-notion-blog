import { PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Type for the getBlogPosts function
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  authors: {
    id: string;
    name: string;
    avatar: string;
  }[];
  preview: string;
  content?: PartialBlockObjectResponse[];
};

export type BlogPosts = BlogPost[];