import { sql } from "@vercel/postgres";

const postCities = async (req, res) => {
  const now = new Date(Date.now()).toISOString().slice(0, 19).replace("T", " ");
  console.log(now);
  try {
    const { country, cities } = JSON.parse(req.body);
    let values = "";
    cities.forEach((city, i) => {
      values += `('${country}', '${city}', -1, null, '${now}', '${now}')`;
      if (i !== cities.length - 1) {
        values += ", ";
      }
    });

    const result = await sql.query(
      `INSERT INTO article (country, city, status, content, created_at, updated_at) VALUES ${values}`
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postCities;
