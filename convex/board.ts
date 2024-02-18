import { v } from 'convex/values';
import { mutation } from './_generated/server';

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg'
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string()
  },
  handler: async (contex, args) => {
    const identity = await contex.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await contex.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage
    });

    return board;
  }
});

export const remove = mutation({
  args: {
    id: v.id('boards')
  },
  handler: async (contex, args) => {
    const identity = await contex.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await contex.db.get(args.id);

    if (!board) {
      throw new Error('Board not found');
    }

    if (board.authorId !== identity.subject) {
      throw new Error('Unauthorized');
    }

    await contex.db.delete(args.id);
  }
});

export const update = mutation({
  args: {
    id: v.id('boards'),
    title: v.string()
  },
  handler: async (contex, args) => {
    const identity = await contex.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await contex.db.get(args.id);

    if (!board) {
      throw new Error('Board not found');
    }

    if (board.authorId !== identity.subject) {
      throw new Error('Unauthorized');
    }

    const title = args.title?.trim();

    if (!title) {
      throw new Error('Title is required');
    }

    if (title.length < 3) {
      throw new Error('Title is too short');
    }

    if (title.length > 50) {
      throw new Error('Title is too long');
    }

    const updatedBoard = await contex.db.patch(args.id, {
      title
    });

    return updatedBoard;
  }
});

export const favorite = mutation({
  args: { id: v.id('boards'), orgId: v.string() },
  handler: async (contex, args) => {
    const identity = await contex.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await contex.db.get(args.id);

    if (!board) {
      throw new Error('Board not found');
    }

    const userId = identity.subject;

    const existingFavorite = await contex.db
      .query('userFavorites')
      .withIndex('by_user_board_org', (q) =>
        q.eq('userId', userId).eq('boardId', args.id).eq('orgId', args.orgId)
      )
      .unique();

    if (existingFavorite) {
      await contex.db.delete(existingFavorite._id);
      return board;
    }

    await contex.db.insert('userFavorites', {
      orgId: args.orgId,
      userId,
      boardId: args.id
    });

    return board;
  }
});
