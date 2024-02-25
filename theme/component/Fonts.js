import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Montserrat';
        src: url('/fonts/PTSerif-Regular.ttf');
      }
      `}
  />
);

export default Fonts;
