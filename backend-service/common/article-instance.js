import { prisma } from "./prisma";

export const articleInstance = ({ type }) => {
  const isSpot = type === "spot";
  return isSpot ? prisma.spotArticle : prisma.cityArticle;
};
