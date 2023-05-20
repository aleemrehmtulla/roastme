import { OpenAIStream } from "@/utils/openai";

const MODEL_ID =
  "c4c54e3c8c97cd50c2d2fec9be3b6065563ccf7d43787fb99f84151b867178fe";
const API_KEY = process.env.REPLICATE_KEY;

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { image } = body;

  console.log("Starting diffusion");

  const explainImage = await fetch("https://api.replicate.com/v1/predictions", {
    body: JSON.stringify({
      version: MODEL_ID,
      input: { img: image, prompt: "Explain this picture in detail." },
    }),
    headers: {
      Authorization: `Token ${API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const explanationRes = await explainImage.json();

  console.log("Got response from Replicate: ", explainImage);

  // we're waiting with a timeout because the model takes a while to generate
  // you can also setup a db + websocket to get notified when the model is done
  // but while although better, it's a bit much for a smol project
  await new Promise((resolve) => setTimeout(resolve, 14000));

  console.log("Getting diffusion");

  const getExplanation = await fetch(explanationRes.urls.get, {
    headers: {
      Authorization: `Token ${API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const explanationFinished = await getExplanation.json();
  const output = explanationFinished.output.join(" ");

  console.log("Got diffusion: ", output.length);

  const stream = await OpenAIStream(output);
  return new Response(stream);
};

export default handler;
