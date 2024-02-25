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

// eslint-disable-next-line no-unused-vars
const Markdown = ({ children, node, ...restProps }) => {
  const MarkdownHeading = ({ children, as }) => (
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
      color="primary.300"
      _before={{
        content: '""',
        position: "absolute",
        backgroundColor: "primary.300",
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
    h1: ({ children }) => (
      <MarkdownHeading as="h1" {...restProps}>
        {children}
      </MarkdownHeading>
    ),
    h2: ({ children }) => (
      <MarkdownHeading as="h2" {...restProps}>
        {children}
      </MarkdownHeading>
    ),
    h3: ({ children }) => (
      <MarkdownHeading as="h3" {...restProps}>
        {children}
      </MarkdownHeading>
    ),
    h4: ({ children }) => (
      <MarkdownHeading as="h4" {...restProps}>
        {children}
      </MarkdownHeading>
    ),
    h5: ({ children }) => (
      <MarkdownHeading as="h5" {...restProps}>
        {children}
      </MarkdownHeading>
    ),
    h6: ({ children }) => (
      <MarkdownHeading as="h6" {...restProps}>
        {children}
      </MarkdownHeading>
    ),
    p: (props) => {
      const { children } = props;
      return (
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
          color="neutral.700"
          position="relative"
          pb="8"
          mb="6"
          _before={{
            content: '""',
            position: "absolute",
            backgroundColor: "primary.300",
            width: "100%",
            bottom: "-6px",
            height: "3px",
            left: "0px",
          }}
          {...restProps}
        >
          {children}
        </Text>
      );
    },

    ul: ({ children }) => <List {...restProps}>{children}</List>,
    li: ({ children }) => (
      <List {...restProps}>
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
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
};

export default Markdown;
