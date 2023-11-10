import { Button, Flex } from "@chakra-ui/react";
import { usePostPhoto } from "hooks/db";
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
        setPhotoDisplay(true);
      },
    }
  );

  const { mutate: postPhoto } = usePostPhoto(
    { type },
    {
      onSuccess: () => {
        setPhotoDisplay(false);
        alert("success");
      },
    }
  );

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
          newPhoto({ country, city, spot });
        }}
        alignSelf="self-start"
        isLoading={isNewingPhoto}
        isDisabled={isNewingPhoto}
        {...generateButtonProps}
      >
        New photo
      </Button>
      {photoDisplay && photo?.url && (
        <Flex flexDirection="column" rowGap="4">
          <Image
            alt={city}
            width="2048"
            height="2048"
            src={window?.location?.origin + photo?.url}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
          <Link passHref href={reference?.href}>
            Photo reference: {reference?.innerHTML}
          </Link>
          <Button
            onClick={() => {
              postPhoto({
                country,
                city,
                spot,
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
