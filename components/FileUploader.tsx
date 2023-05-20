import { Text, HStack, useToast, useBreakpointValue } from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";

type FileUploadProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setImage: (image: File | null) => void;
  setRoast: (roast: string | null) => void;
};

const FileUploader = ({
  loading,
  setLoading,
  setImage,
  setRoast,
}: FileUploadProps) => {
  const toast = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files)
      return toast({ title: "No file selected", status: "error" });

    setLoading(true);
    setRoast(null);
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      const hit = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String }),
      });

      if (!hit.ok) {
        return toast({ title: "Upload failed", status: "error" });
      }

      const streamData = hit.body;
      if (!streamData) return;

      const streamReader = streamData.getReader();
      const textDecoder = new TextDecoder();
      let roastText = "";
      setLoading(false);

      while (true) {
        const { value, done } = await streamReader.read();
        const chunkValue = textDecoder.decode(value);

        roastText = roastText + chunkValue;
        setRoast(roastText);

        if (done) {
          break;
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
  const iconSize = isMobile ? 24 : 32;

  return (
    <label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        disabled={loading}
        hidden
        onChange={(e) => handleUpload(e)}
      />

      <HStack
        rounded="md"
        spacing="4"
        px="4"
        py="2"
        border="1px dashed"
        borderColor="black"
        align="center"
        transitionDuration="0.2s"
        _hover={loading ? {} : { bg: "gray.100" }}
        opacity={loading ? 0.5 : 1}
        cursor={loading ? "not-allowed" : "pointer"}
      >
        <AiOutlineCloudUpload size={iconSize} />
        <Text
          fontSize={{
            base: "xs",
            md: "lg",
          }}
          fontWeight="medium"
          pb={0.5}
        >
          upload a picture of yourself {!isMobile && "to get roasted"}
        </Text>
      </HStack>
    </label>
  );
};

export default FileUploader;
