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

const generateAiBackgroundFlow = ai.defineFlow(
  {
    name: 'generateAiBackgroundFlow',
    outputSchema: GenerateAiBackgroundOutputSchema,
  },
  async () => {
    // Return an empty data URI as the background is now handled by CSS.
    return {backgroundImageDataUri: ''};
  }
);
