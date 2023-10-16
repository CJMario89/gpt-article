import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    // await sql`DROP TABLE article`;
    const result =
      await sql`CREATE TABLE article ( country varchar(255), city varchar(255), status varchar(255), content text, created_at timestamp, updated_at timestamp );`;
    return response.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
}
