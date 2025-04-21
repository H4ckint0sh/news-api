// src/db/seeds/utils.ts
import { Comment } from "#db/models/index.js";
import { CommentDataInput } from "#db/seeds/seed.js";

export const createRef = <T, V extends keyof T>(arr: T[], key: keyof T & string, value: V): Record<string, T[V]> => {
  return arr.reduce((ref: Record<string, T[V]>, element) => {
    ref[String(element[key])] = element[value];
    return ref;
  }, {});
};

export const formatComments = (comments: CommentDataInput[], idLookup: Record<string, number>): Comment[] => {
  return comments.map((comment) => {
    const { belongs_to, ...restOfComment } = comment;
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      ...restOfComment,
    };
  });
};
