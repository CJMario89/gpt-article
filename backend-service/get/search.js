import { articleInstance } from "backend-service/common";

export const search = async ({ type, region, limit = 10, text }) => {
  const places = await articleInstance({ type }).findMany({
    where: {
      ...(region ? { region } : {}),
    },
    orderBy: {
      _relevance: {
        fields: [type],
        search: text,
        sort: "asc",
      },
    },
    take: limit,
  });
  return places;
};
