import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import BackToTopSvg from "assets/back-to-top.svg";
import { useEffect, useRef, useState } from "react";
let debounceTimeout = null;

const BackToTop = ({ onClick }) => {
  const ref = useRef(null);
  useEffect(() => {
    const hideBackToTop = () => {
      setTimeout(() => {
        if (ref?.current) {
          ref.current.style.opacity = "0";
        }
      }, 4000);
    };
    hideBackToTop();
    const showBackToTop = () => {
      ref.current.style.opacity = "1";
      hideBackToTop();
    };
    document
      .querySelector("#container")
      .addEventListener("wheel", showBackToTop);
    return () => {
      document
        .querySelector("#container")
        .removeEventListener("wheel", showBackToTop);
    };
  }, []);
  return (
    <Flex
      ref={ref}
      position="fixed"
      bottom={{ base: "2", lg: "12" }}
      bgColor="neutral.600"
      color="neutral.50"
      right="0"
      w="10"
      h="10"
      fontSize="sm"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      cursor="pointer"
      zIndex="111"
      transition={"opacity 1s"}
      onClick={() => {
        document.querySelector("#container").scrollTo({ top: 0 });
        onClick();
      }}
    >
      <BackToTopSvg color="neutral.100" w="6" h="6" />
    </Flex>
  );
};

const Catelogue = ({ contents, place, isSpot }) => {
  const ref = useRef(null);
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const [showMask, setShowMask] = useState(false);
  useEffect(() => {
    const wheelEvent = () => {
      observerContent(ref, isDesktop);
    };
    window.addEventListener("wheel", wheelEvent);
    observerContent(ref, isDesktop);
    return () => {
      window.removeEventListener("wheel", wheelEvent);
    };
  }, [isDesktop]);
  return (
    <>
      {!isDesktop && (
        <>
          <Box
            position="fixed"
            borderRadius="full"
            bgColor="white"
            borderColor="primary.700"
            borderWidth="1px"
            boxShadow="0 0 10px 0 rgba(0,0,0,0.1)"
            right="0"
            bottom="80px"
            overflow="hidden"
            zIndex={101}
          >
            <Button
              fontSize="sm"
              color="primary.700"
              onClick={() => {
                ref.current.style.display = "flex";
                setShowMask(true);
              }}
            >
              Catelogue
            </Button>
          </Box>
          {showMask && (
            <Box
              w="100vw"
              h="100vh"
              position="fixed"
              bgColor="rgba(0, 0, 0, 0.3)"
              left="0"
              top="0"
              zIndex="100"
              onClick={() => {
                setShowMask(false);
                ref.current.style.display = "none";
              }}
            />
          )}
        </>
      )}
      <Flex
        ref={ref}
        display={{ base: "none", lg: "flex" }}
        position={{ base: "fixed", lg: "sticky" }}
        top={{ base: "84", lg: "0px" }}
        border="1px solid"
        borderColor="primary.300"
        borderRadius="lg"
        bgColor={{ base: "white", lg: "transparent" }}
        alignSelf={{ base: "self-center", lg: "self-start" }}
        p="4"
        m={{ base: "auto 0", lg: "unset" }}
        mb={{ base: "16", lg: "0" }}
        w="fit-content"
        zIndex={101}
      >
        <Flex
          position="relative"
          rowGap="4"
          flexDirection="column"
          w="fit-content"
        >
          <Text
            fontWeight="semibold"
            color="primary.700"
            fontSize="sm"
            opacity={0.4}
            id={`ctd`}
            cursor="pointer"
            w="280px"
            userSelect="none"
            key={place}
            onClick={() => {
              document.querySelector("#container").scrollTo({
                top: document.querySelector("#description").offsetTop - 200,
                behavior: "smooth",
              });
              if (!isDesktop) {
                ref.current.style.display = "none";
                setShowMask(false);
              }
              setTimeout(() => {
                observerContent(ref, isDesktop);
              }, 500);
            }}
          >
            About {`${place}`}
          </Text>
          {contents.map((content, i) => {
            if (content.startsWith("#")) {
              return (
                <Text
                  key={content}
                  fontWeight="semibold"
                  color="primary.700"
                  fontSize="sm"
                  opacity={0.4}
                  id={`C${i}`}
                  className="_ct"
                  cursor="pointer"
                  w="280px"
                  _hover={{ opacity: 0.9 }}
                  userSelect="none"
                  onClick={() => {
                    const container = document.querySelector("#container");
                    container.scrollTo({
                      top: document.querySelector(`#M${i}`).offsetTop - 200,
                      behavior: "smooth",
                    });
                    if (!isDesktop) {
                      ref.current.style.display = "none";
                      setShowMask(false);
                    }
                    setTimeout(() => {
                      observerContent(ref, isDesktop);
                    }, 500);
                  }}
                >
                  {content?.replace(/#/g, "")}
                </Text>
              );
            } else {
              return null;
            }
          })}
          {isSpot && (
            <Text
              fontWeight="semibold"
              color="primary.700"
              fontSize="sm"
              opacity={0.4}
              id={`ctdi`}
              cursor="pointer"
              w="280px"
              userSelect="none"
              onClick={() => {
                const container = document.querySelector("#container");
                container.scrollTo({
                  top: document.querySelector("#detail").offsetTop - 200,
                  behavior: "smooth",
                });
                if (!isDesktop) {
                  ref.current.style.display = "none";
                  setShowMask(false);
                }
                setTimeout(() => {
                  observerContent(ref, isDesktop);
                }, 500);
              }}
            >
              Detail information
            </Text>
          )}
        </Flex>
      </Flex>
      <BackToTop
        onClick={() => {
          observerContent(ref, isDesktop);
        }}
      />
    </>
  );
};

function observerContent(ref, isDesktop) {
  if (!ref.current) return;
  const catelogueHeight = ref.current?.offsetHeight;
  const containerHeight = isDesktop
    ? window.innerHeight - 104
    : window.innerHeight - 64;
  const markdowns = document.querySelectorAll("._md");
  const catelogues = document.querySelectorAll("._ct");
  const aboutCateloge = document.querySelector("#ctd");
  const detailCateloge = document.querySelector("#ctdi");
  const detail = document.querySelector("#detail");
  const description = document.querySelector("#description");
  clearTimeout(debounceTimeout);
  setTimeout(() => {
    let iterateCatelogue = null;
    let primaryCatelogue = null;
    let secondaryCatelogue = null;
    let breaked = null;
    let isInit = true;
    catelogues.forEach((catelogue) => {
      catelogue.style.opacity = 0.4;
    });
    for (let i = 0; i < markdowns.length; i++) {
      const markdown = markdowns[i];
      const index = markdown.id.replace("M", "");
      const catelogue = document.querySelector(`#C${index}`);
      if (!catelogue) continue;
      if (markdown.getBoundingClientRect().top !== 0) {
        isInit = false;
      }
      if (markdown.getBoundingClientRect().top > 600) {
        breaked = true;
        break;
      }
      if (
        markdown.getBoundingClientRect().top < 600 &&
        markdown.getBoundingClientRect().top > 100
      ) {
        if (primaryCatelogue) {
          secondaryCatelogue = catelogue;
        } else {
          primaryCatelogue = catelogue;
        }
      }
      iterateCatelogue = catelogue;
    }
    if (primaryCatelogue) {
      primaryCatelogue.style.opacity = 1;
    }
    if (secondaryCatelogue) {
      secondaryCatelogue.style.opacity = 1;
    }
    if (
      !primaryCatelogue &&
      !secondaryCatelogue &&
      iterateCatelogue &&
      breaked
    ) {
      iterateCatelogue.style.opacity = 1;
    }
    if (
      description.getBoundingClientRect().top < 900 &&
      description.getBoundingClientRect().top > 100
    ) {
      aboutCateloge.style.opacity = 1;
    } else {
      aboutCateloge.style.opacity = 0.4;
    }
    if (detail) {
      if (
        detail.getBoundingClientRect().top < 600 &&
        detail.getBoundingClientRect().top > 0
      ) {
        detailCateloge.style.opacity = 1;
      } else {
        detailCateloge.style.opacity = 0.4;
      }
    }

    const currentCatelogue =
      primaryCatelogue || secondaryCatelogue || iterateCatelogue;

    let currentLength = 0;
    catelogues?.forEach((catelogue, i) => {
      if (catelogue.id === currentCatelogue?.id) {
        currentLength = i;
      }
    });
    if (catelogueHeight > containerHeight) {
      const halfContainerTH = Math.floor(
        catelogues[currentLength]?.offsetTop / (containerHeight / 2)
      );
      ref.current.style.top = isDesktop
        ? `${-(containerHeight / 2) * halfContainerTH}px`
        : `${-((containerHeight / 2) * halfContainerTH) + 84}px`;
    } else {
      ref.current.style.top = isDesktop ? "0px" : "84px";
    }
    if (isInit) {
      ref.current.style.top = isDesktop ? "0px" : "84px";
    }
  }, 500);
}

export default Catelogue;
