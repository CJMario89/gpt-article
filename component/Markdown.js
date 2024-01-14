import { Heading, List, ListItem, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const headingMarginLeftMapping = {
  h1: { ml: "0px", mt: "12" },
  h2: { ml: "0px", mt: "10" },
  h3: { ml: "0px", mt: "8" },
  h4: { ml: "0px", mt: "6" },
  h5: { ml: "0px", mt: "4" },
  h6: { ml: "0px", mt: "2" },
};

const MarkdownHeading = ({ children, as, ...restProps }) => (
  <Heading
    as={as}
    pl="5"
    {...headingMarginLeftMapping[as]}
    sx={{
      "h2 + &": { mt: "2" },
      "h3 + &": { mt: "2" },
      "h4 + &": { mt: "2" },
    }}
    position="relative"
    _before={{
      content: '""',
      position: "absolute",
      backgroundColor: "black",
      width: "6px",
      top: "14%",
      height: "68%",
      left: "0px",
    }}
    {...restProps}
  >
    {children}
  </Heading>
);

const components = {
  h1: ({ children }) => <MarkdownHeading as="h1">{children}</MarkdownHeading>,
  h2: ({ children }) => <MarkdownHeading as="h2">{children}</MarkdownHeading>,
  h3: ({ children }) => <MarkdownHeading as="h3">{children}</MarkdownHeading>,
  h4: ({ children }) => <MarkdownHeading as="h4">{children}</MarkdownHeading>,
  h5: ({ children }) => <MarkdownHeading as="h5">{children}</MarkdownHeading>,
  h6: ({ children }) => <MarkdownHeading as="h6">{children}</MarkdownHeading>,
  p: ({ children }) => (
    <Text
      sx={{
        "h2 + &": { ml: headingMarginLeftMapping["h2"]["ml"], mt: "2" },
        "h3 + &": { ml: headingMarginLeftMapping["h3"]["ml"], mt: "2" },
        "h4 + &": { ml: headingMarginLeftMapping["h4"]["ml"], mt: "2" },
        "h5 + &": { ml: headingMarginLeftMapping["h5"]["ml"], mt: "2" },
        "h6 + &": { ml: headingMarginLeftMapping["h6"]["ml"], mt: "2" },
        "h2 + p + &": { ml: headingMarginLeftMapping["h2"]["ml"], mt: "8" },
        "h3 + p + &": { ml: headingMarginLeftMapping["h3"]["ml"], mt: "8" },
        "h4 + p + &": { ml: headingMarginLeftMapping["h4"]["ml"], mt: "8" },
        "h5 + p + &": { ml: headingMarginLeftMapping["h5"]["ml"], mt: "8" },
        "h6 + p + &": { ml: headingMarginLeftMapping["h6"]["ml"], mt: "8" },
      }}
      fontSize="18px"
      lineHeight="32px"
    >
      {children}
    </Text>
  ),

  ul: ({ children }) => <List>{children}</List>,
  li: ({ children }) => (
    <List>
      <ListItem
        position="relative"
        my="2"
        pl="8"
        ml="16"
        _before={{
          content: '"☛"',
          position: "absolute",
          left: "0px",
        }}
      >
        {children}
      </ListItem>
    </List>
  ),
};
const Markdown = ({ children, restProps }) => {
  return (
    <ReactMarkdown components={components} {...restProps}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
