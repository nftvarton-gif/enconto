'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating dynamic AI backgrounds for the hero section of the Enconto website.
 *
 * - generateAiBackground - A function that generates an AI background image based on current design trends.
 * - GenerateAiBackgroundOutput - The return type for the generateAiBackground function, which includes the data URI of the generated image.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiBackgroundOutputSchema = z.object({
  backgroundImageDataUri: z
    .string()
    .describe(
      'The data URI of the generated AI background image, which must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GenerateAiBackgroundOutput = z.infer<typeof GenerateAiBackgroundOutputSchema>;

export async function generateAiBackground(): Promise<GenerateAiBackgroundOutput> {
  return generateAiBackgroundFlow();
}

const generateAiBackgroundPrompt = ai.definePrompt({
  name: 'generateAiBackgroundPrompt',
  prompt: `You are an expert SVG designer. Generate a visually engaging abstract SVG background suitable for the hero section of a website. The website is for a company specializing in AI automations, n8n integrations, and SaaS solutions for business.

The design should reflect current design trends and use a dark color palette with violet (#7f5af0) and green (#2cb67d) accents. The SVG should be self-contained and not reference external files.

Output only the raw SVG code, starting with <svg> and ending with </svg>. Do not wrap it in markdown or any other characters.
`,
});

const generateAiBackgroundFlow = ai.defineFlow(
  {
    name: 'generateAiBackgroundFlow',
    outputSchema: GenerateAiBackgroundOutputSchema,
  },
  async () => {
    const response = await generateAiBackgroundPrompt();
    const svgContent = response.text;
    
    const svgBase64 = Buffer.from(svgContent).toString('base64');
    const dataUri = `data:image/svg+xml;base64,${svgBase64}`;

    return {backgroundImageDataUri: dataUri};
  }
);
