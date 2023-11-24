import { Button, Flex } from "@chakra-ui/react";
import { useNewPhoto } from "hooks/google";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const GooglePhotoGenerator = ({
  type,
  country,
  city,
  spot,
  generateButtonProps,
  ...restProps
}) => {
  const [photoDisplay, setPhotoDisplay] = useState(false);
  const {
    mutate: newPhoto,
    isLoading: isNewingPhoto,
    data: photo,
  } = useNewPhoto(
    { type },
    {
      onSuccess: () => {
        setPhotoDisplay(false); // todo: get image by query
      },
    }
  );

  const reference = useMemo(() => {
    if (typeof window !== "undefined") {
      const referenceNode = new DOMParser().parseFromString(
        photo?.image_reference_link,
        "text/html"
      ).body.firstChild;
      return {
        innerHTML: referenceNode.innerHTML,
        href: referenceNode.href,
      };
    }
  }, [photo?.image_reference_link]);
  return (
    <Flex flexDirection="column" rowGap="4" {...restProps}>
      <Button
        onClick={() => {
          newPhoto({ country, city, spot });
        }}
        alignSelf="self-start"
        isLoading={isNewingPhoto}
        isDisabled={isNewingPhoto}
        {...generateButtonProps}
      >
        New photo
      </Button>
      {photoDisplay && (
        <Flex flexDirection="column" rowGap="4">
          <Image
            alt={city}
            width="2048"
            height="2048"
            src={""} //blob
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <Link passHref href={reference?.href ?? ""}>
            Photo reference: {reference?.innerHTML}
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default GooglePhotoGenerator;
