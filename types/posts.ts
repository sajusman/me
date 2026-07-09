export type PostMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  readingTime?: string;
};

export type Post = PostMeta & { slug: string };
