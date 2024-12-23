import { createIcon } from "@chakra-ui/react";

const HeartFillSVG = createIcon({
  displayName: "HeartFill",
  viewBox: "0 0 16 16",
  path: (
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
    />
  ),
});

export default HeartFillSVG;
