import { useState } from "react";

import { Heading, Text, VStack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import FileUploader from "@/components/FileUploader";
import RoastOutput from "@/components/RoastOutput";
import GithubButton from "@/components/GithubButton";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [roast, setRoast] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <NextSeo
        title="Roast Me by Aleem!"
        description="I combined the new salesforce model with gpt-4 to roast outfits"
      />
      <VStack h="100vh" pt={{ base: 8, md: 32 }} spacing={6}>
        <Heading
          size={{
            base: "2xl",
            md: "4xl",
          }}
          color="black"
        >
          Roast Me 🔥
        </Heading>
        <Text fontSize={{ base: "sm", md: "lg" }}>
          note: current estimated load time is 14s
        </Text>

        <FileUploader
          loading={loading}
          setImage={setImage}
          setRoast={setRoast}
          setLoading={setLoading}
        />
        <RoastOutput image={image} roast={roast} loading={loading} />

        <GithubButton />
      </VStack>
    </>
  );
}
