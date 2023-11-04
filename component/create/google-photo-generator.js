import { Button, Flex } from "@chakra-ui/react";
import { usePostCityPhoto } from "hooks/db";
import { useNewCityPhoto } from "hooks/google";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const GooglePhotoGenerator = ({
  country,
  city,
  generateButtonProps,
  ...restProps
}) => {
  const [photoDisplay, setPhotoDisplay] = useState(false);
  const {
    mutate: newCityPhoto,
    isLoading: isNewingPhoto,
    data: photo,
  } = useNewCityPhoto({
    onSuccess: () => {
      setPhotoDisplay(true);
    },
  });

  const { mutate: postCityPhoto } = usePostCityPhoto({
    onSuccess: () => {
      setPhotoDisplay(false);
      alert("success");
    },
  });

  const reference = useMemo(() => {
    if (typeof window !== "undefined") {
      const referenceNode = new DOMParser().parseFromString(
        photo?.referenceLink,
        "text/html"
      ).body.firstChild;
      return {
        innerHTML: referenceNode.innerHTML,
        href: referenceNode.href,
      };
    }
  }, [photo?.referenceLink]);

  return (
    <Flex flexDirection="column" rowGap="4" {...restProps}>
      <Button
        onClick={() => {
          newCityPhoto({ city });
        }}
        isLoading={isNewingPhoto}
        isDisabled={isNewingPhoto}
        {...generateButtonProps}
      >
        New photo
      </Button>
      {photoDisplay && (
        <Flex flexDirection="column" rowGap="4">
          <Image
            alt=""
            width="2048"
            height="2048"
            src={window?.location?.origin + photo?.url}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <Link href={reference?.href}>{reference?.innerHTML}</Link>
          <Button
            onClick={() => {
              postCityPhoto({
                country,
                city,
                url: photo.url,
                referenceLink: reference?.href,
                referenceName: reference?.innerHTML,
              });
            }}
            alignSelf="self-start"
          >
            confirm
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default GooglePhotoGenerator;
