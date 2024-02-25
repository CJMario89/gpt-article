import { useMemo } from "react";

const useComposeImageUrl = ({ image = {}, region, prefecture, city, spot }) => {
  const { fetched, referenceLink, referenceName } = image;
  const isSpot = !!spot;
  const isCity = !!city;
  const imageUrl = useMemo(() => {
    const baseUrl = "https://jp-travel.s3.amazonaws.com";
    if (isSpot) {
      return `${baseUrl}/${fetched}/image/spot/${city}_${spot}_${fetched}.webp`;
    } else if (isCity) {
      return `${baseUrl}/${fetched}/image/city/${prefecture}_${city}_${fetched}.webp`;
    } else {
      return `${baseUrl}/${fetched}/image/prefecture/${region}_${prefecture}_${fetched}.webp`;
    }
  }, [fetched, isCity, isSpot, region, prefecture, city, spot]);
  return {
    imageUrl,
    referenceLink,
    referenceName,
  };
};

export default useComposeImageUrl;
