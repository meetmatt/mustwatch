import { Context } from "@x/oak";
import { prisma } from "../../prisma/client.ts";

export async function handleGetLists(ctx: Context) {
  const userId = ctx.state.userId;
  const lists = await prisma.list.findMany({
    where: { userId },
    include: { movies: true },
  });
  ctx.response.body = lists;
}

export async function handleCreateList(ctx: Context) {
  const userId = ctx.state.userId;
  const body = await ctx.request.body.json();
  const { title, slug, isPublic } = body;

  const list = await prisma.list.create({
    data: {
      title,
      slug,
      isPublic: isPublic || false,
      userId,
    },
  });

  ctx.response.body = list;
}
