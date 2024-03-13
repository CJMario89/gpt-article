import { search } from "backend-service/get";
import SearchByLocale from "backend-service/get/search-by-locale";

const Search = async (req, res) => {
  try {
    let places;
    if (req.query.locale !== "en-US" && !!req.query.text) {
      places = await SearchByLocale(req.query);
    } else {
      places = await search(req.query);
    }
    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default Search;
