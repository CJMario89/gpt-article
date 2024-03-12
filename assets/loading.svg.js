import { createIcon } from "@chakra-ui/react";

const LoadingSvg = createIcon({
  displayName: "loading",
  viewBox: "0 0 100 100",
  path: (
    <circle cx="50" cy="26" r="16" fill="#d32f2f">
      <animate
        attributeName="cy"
        dur="0.78125s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
        keyTimes="0;0.5;1"
        values="26;74;26"
      ></animate>
    </circle>
  ),
});

export default LoadingSvg;
