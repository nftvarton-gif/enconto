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
    // Animated SVG to create a floating gradient effect.
    const svgContent = `<svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stop-color="#0D0D0D" stop-opacity="0"></stop>
          <stop offset="100%" stop-color="#0D0D0D"></stop>
        </radialGradient>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7f5af0" stop-opacity="0.3">
                <animate attributeName="stop-color" values="#7f5af0; #2cb67d; #7f5af0" dur="10s" repeatCount="indefinite"></animate>
            </stop>
            <stop offset="100%" stop-color="#2cb67d" stop-opacity="0.3">
                <animate attributeName="stop-color" values="#2cb67d; #7f5af0; #2cb67d" dur="10s" repeatCount="indefinite"></animate>
            </stop>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#0D0D0D"></rect>
      <rect width="100%" height="100%" fill="url(#lg1)"></rect>
      <rect width="100%" height="100%" fill="url(#g)"></rect>
    </svg>`;
    
    const svgBase64 = Buffer.from(svgContent).toString('base64');
    const dataUri = `data:image/svg+xml;base64,${svgBase64}`;

    return {backgroundImageDataUri: dataUri};
  }
);
