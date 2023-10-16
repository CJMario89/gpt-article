const postArticleStatus = async (req, res) => {
  try {
    const { status } = JSON.parse(req.body);

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

export default postArticleStatus;
