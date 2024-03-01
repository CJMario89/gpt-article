import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { forwardRef } from "react";

const NextLink = forwardRef(function NextLink(props, ref) {
  const { href, target: _target, children, ...rest } = props;

  const isInternal =
    href &&
    (href.toString().startsWith("/") || href.toString().startsWith("#"));
  const target = _target || isInternal ? "_self" : "_blank";

  return (
    <ChakraLink
      ref={ref}
      // as={Link}
      href={href}
      target={target}
      {...rest}
    >
      {children}
    </ChakraLink>
  );
});

export default NextLink;
