import { Heading, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const MarkdownHeading = ({ children, as, ...restProps }) => (
  <Heading as={as} mt="24" mb="4" {...restProps}>
    {children}
  </Heading>
);

const components = {
  h1: ({ children }) => <MarkdownHeading children={children} as="h1" />,
  h2: ({ children }) => <MarkdownHeading children={children} as="h2" />,
  h3: ({ children }) => <MarkdownHeading children={children} as="h3" />,
  h4: ({ children }) => <MarkdownHeading children={children} as="h4" />,
  h5: ({ children }) => <MarkdownHeading children={children} as="h5" />,
  h6: ({ children }) => <MarkdownHeading children={children} as="h6" />,
  p: ({ children }) => <Text fontSize="22px">{children}</Text>,
};
const Markdown = ({ children }) => {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
};

export default Markdown;
