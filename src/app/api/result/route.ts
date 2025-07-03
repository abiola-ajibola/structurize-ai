import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
import { readFileAsText } from "@/lib/utils";
import { NextRequest } from "next/server";

type FormDataShape = {
  input: File;
  input_text: string;
  schema?: File;
  schema_text: string;
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const fd = Object.fromEntries(formData) as FormDataShape;
  const input =
    fd.input.size > 0 ? await readFileAsText(fd.input) : fd.input_text;
  const schema =
    !!fd.schema && fd.schema.size > 0
      ? await readFileAsText(fd.schema)
      : fd.schema_text;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      "Generate a structured CSV text that has the following headers" +
      schema +
      "\nEnclose each value in double quotes.",
    config: {
      systemInstruction: "Given this writeup:\n" + input,
      responseMimeType: "text/plain",
    },
  });

  return new Response(JSON.stringify({ message: response.text }), {
    status: 200,
  });
}
