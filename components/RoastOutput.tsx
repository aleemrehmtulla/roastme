import { Box, Image, Stack, Text } from "@chakra-ui/react";
import LoadingText from "./LoadingText";

type RoastOutputProps = {
  image: File | null;
  roast: string | null;
  loading: boolean;
};

const DefaultRoast = `
Well well well, look at Mr. Mural Man over here. 
You must be so proud standing in front of that colorful wall like a real life Cartoon Network character. 
Did you spend all day picking out that black shirt to try and make yourself stand out? 
Because let me tell you, it’s not working. 
And as for those mysterious silhouettes in the background, I can only assume they’re trying to escape your cringeworthy presence. 
Keep posing though, maybe one day you’ll become a real cartoon character and we can all live in your colorful, delusional world.
`;
const DefaultImage = "https://a264-66-46-12-74.ngrok-free.app/aleem.png";
const DefaultDescription = "Aleem Rehmtulla about to be roasted";

const RoastOutput = ({ image, roast, loading }: RoastOutputProps) => {
  return (
    <Stack
      w={{
        base: "full",
        md: "60%",
      }}
      direction={{ base: "column", md: "row" }}
      px={{ base: 8, md: 0 }}
      pb={{ base: 12, md: 0 }}
    >
      <Image
        src={image ? URL.createObjectURL(image) : DefaultImage}
        alt={image ? image.name : DefaultDescription}
        objectFit="cover"
        rounded="md"
        h={{ base: "50%", md: "20rem" }}
        w={{ base: "full", md: "20rem" }}
      />
      <Box
        bg="green.700"
        p={4}
        rounded="md"
        h="full"
        w={{ base: "full", md: "30rem" }}
      >
        <Text color="whiteAlpha.900">
          {roast && roast}

          {loading && <LoadingText />}

          {!roast && !loading && <>{DefaultRoast}</>}
        </Text>
      </Box>
    </Stack>
  );
};
export default RoastOutput;
