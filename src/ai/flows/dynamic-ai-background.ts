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
    let svgContent = response.text;
    
    // Ensure the response is a valid SVG by cleaning it up
    if (svgContent.includes('```svg')) {
      svgContent = svgContent.split('```svg')[1].split('```')[0].trim();
    } else if (!svgContent.trim().startsWith('<svg')) {
      // If the response is not a valid SVG, create a fallback
      svgContent = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#7f5af0" offset="0%"/><stop stop-color="#2cb67d" offset="100%"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;
    }

    const svgBase64 = Buffer.from(svgContent).toString('base64');
    const dataUri = `data:image/svg+xml;base64,${svgBase64}`;

    return {backgroundImageDataUri: dataUri};
  }
);
