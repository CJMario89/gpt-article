import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Montserrat';
        src: url('/fonts/Montserrat-VariableFont_wght.ttf');
      }
      `}
  />
);

export default Fonts;
