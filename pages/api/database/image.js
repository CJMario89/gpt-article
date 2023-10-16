import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    // await sql`DROP TABLE image`;
    const result =
      await sql`CREATE TABLE image ( city varchar(255), url varchar(255), created_at timestamp, updated_at timestamp);`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
