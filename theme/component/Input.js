import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

export default defineMultiStyleConfig({
  defaultProps: {
    size: "md",
    variant: "filled",
  },
  variants: {
    filled: definePartsStyle(() => {
      return {
        field: {
          pl: "12",
          pr: "6",
          background: "transparent",
          border: "1px solid",
          borderColor: "neutral.200",
          _focusVisible: {
            borderColor: "primary.500",
            boxShadow: "none",
          },
          _hover: {
            background: "transparent",
            borderColor: "neutral.400",
          },
        },
        addon: {
          ml: 2,
        },
      };
    }),
  },
});
