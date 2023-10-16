import { sql } from "@vercel/postgres";

const postArticles = async (req, res) => {
  try {
    const { country, cities, articles } = JSON.parse(req.body);
    console.log(articles[0].replaceAll("'", "''"));
    console.log(cities);
    let values = "";
    cities.forEach((city, i) => {
      values += `('${country}', '${city}', 0, '${articles[i].replaceAll(
        "'",
        "''"
      )}')`;
      if (i !== cities.length - 1) {
        values += ", ";
      }
    });

    const result = await sql.query(
      `INSERT INTO article (country, city, status, content) VALUES ${values}`
    );
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postArticles;
