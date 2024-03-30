const Button = {
  baseStyle: {
    // ...define your base styles
    borderRadius: "md",
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
  variants: {
    outline: {
      border: "1px solid",
      borderColor: "primary.300",
      color: "neutral.700",
    },
    solid: {
      bgColor: "primary.300",
      color: "neutral.50",
      _hover: {
        bgColor: "primary.800",
        _disabled: {
          bgColor: "primary.200",
          color: "neutral.100",
        },
      },
    },

    ghost: {
      color: "neutral.800",
      _hover: {
        bgColor: "primary.50",
      },
      _active: {
        bgColor: "primary.50",
      },
    },
  },
  defaultProps: {
    sizes: "lg",
    variant: "ghost",
  },
};

export default Button;
