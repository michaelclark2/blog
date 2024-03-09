import { SITE } from "@config";
import getSortedPosts from "@utils/getSortedPosts";
import { getCollection } from "astro:content";

const posts = await getCollection("blog");

const sortedPosts = await getSortedPosts(posts);

const postsWithURL = sortedPosts.map(post => {
  const { body, id, ...rest } = post;
  // @ts-ignore
  rest.data.url = `${SITE.website}/posts/${rest.slug}`;
  return rest;
});

export async function GET({
  params,
  request,
}: {
  params: any;
  request: Request;
}) {
  return new Response(
    JSON.stringify({
      featuredPosts: postsWithURL.filter(post => post.data.featured),
      recentPosts: postsWithURL.filter(post => !post.data.featured),
    })
  );
}
