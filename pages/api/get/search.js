import { search } from "backend-service/get";

const Search = async (req, res) => {
  try {
    const places = await search(req.query);
    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default Search;
