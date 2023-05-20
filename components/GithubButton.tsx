import { HStack, Text } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

const GithubButton = () => {
  return (
    <HStack
      bg="black"
      p={4}
      py={2}
      rounded="md"
      _hover={{ opacity: 0.8 }}
      _active={{ transform: "scale(0.99)", opacity: 0.7 }}
      cursor="pointer"
      transitionDuration="0.2s"
      pos={{ base: "fixed", md: "absolute" }}
      bottom={4}
      right={4}
      onClick={() => window.open("https://github.com/aleemrehmtulla/roastme")}
    >
      <AiFillGithub color="white" />
      <Text fontWeight={"bold"} color={"white"}>
        toss a star :)
      </Text>
    </HStack>
  );
};

export default GithubButton;
