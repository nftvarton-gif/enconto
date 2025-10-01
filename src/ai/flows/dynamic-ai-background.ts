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
  output: {schema: GenerateAiBackgroundOutputSchema},
  prompt: `Generate a visually engaging abstract AI background image suitable for the hero section of a website. The website is for a company specializing in AI automations, n8n integrations, and SaaS solutions for business.

The design should reflect current design trends and use a dark color palette with violet (#7f5af0) and green (#2cb67d) accents. The image should be provided as a data URI.

Output only the data URI for the image.`,
});

const generateAiBackgroundFlow = ai.defineFlow(
  {
    name: 'generateAiBackgroundFlow',
    outputSchema: GenerateAiBackgroundOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a visually engaging abstract AI background image suitable for the hero section of a website. The website is for a company specializing in AI automations, n8n integrations, and SaaS solutions for business.\n\nThe design should reflect current design trends and use a dark color palette with violet (#7f5af0) and green (#2cb67d) accents. The image should be provided as a data URI.`,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate AI background image.');
    }

    return {backgroundImageDataUri: media.url};
  }
);
