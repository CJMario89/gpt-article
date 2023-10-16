import { sql } from "@vercel/postgres";

const getCities = async (req, res) => {
  try {
    const { country } = req.query;
    console.log("country", country);
    const { rows } =
      await sql`SELECT city, status from article where country=${country};`;
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default getCities;
