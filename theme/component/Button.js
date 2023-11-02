const Button = {
  baseStyle: {
    // ...define your base styles
    fontWeight: "bold",
    border: "1px solid #333333",
    color: "#333333",
  },
  sizes: {
    md: {
      h: "36px",
      fontSize: "md",
      px: "18px",
    },
    lg: {
      h: "48px",
      fontSize: "lg",
      px: "24px",
    },
    xl: {
      h: "56px",
      fontSize: "xl",
      px: "32px",
    },
  },
  defaultProps: {
    sizes: "lg",
  },
};

export default Button;
