import { GoogleGenAI } from "@google/genai";
import type { Tone, LetterLength } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const originalLetter = `
As a community of artists who have grown and created alongside objkt.com, we feel the need to open a sincere and transparent dialogue. Our intention is not to attack, but to clearly state that the relationship between the platform and those who produce the art that sustains it needs urgent change.
We know that objkt is mainly funded through the sales and royalties of our works. Without artists, this ecosystem would not exist. That is why we believe the community has both the right (and the responsibility) to ask for clarity about the direction the platform is taking.
We value the work of the team, but it’s impossible to ignore the growing silence in response to community concerns. That silence feels like a disconnection from those who made it possible for objkt to become what it is today.
We cannot settle for being heard only in appearance.
For art to exist, there must first be an artist. Only then does the collector come into the picture. Today, however, we feel this relationship has been inverted: financial ties with collectors are being prioritized over genuine support for the diversity of artistic voices.
We acknowledge that objkt has showcased diversity on its front page. But diversity is not just about aesthetics. A homepage feature does not erase the fact that many critical voices never find space. Real diversity means giving visibility to uncomfortable, questioning, and reflective works — not just those that fit into a safe or commercial vision of art.

When the selection of artists seems to rely more on friendships or marketing gestures, the essence of what was once an open and inclusive space is lost.
This is not about diminishing what has been achieved, but about being honest: sustainable growth requires more decentralization, transparent processes, and a genuine commitment to the community. Otherwise, objkt risks becoming just a showcase — empty of what gave it life in the first place: art as a living, plural, and often uncomfortable practice.

That’s why we propose:
- Permanent channels of direct dialogue with the community (open meetings, AMAs, or participatory forums).
- Clear and transparent criteria for homepage features and open call selections.
- Decentralized mechanisms that allow artists and collectors to actively participate in decisions that affect the ecosystem.

Art is not sustained by surface-level gestures. It’s sustained by trust, mutual respect, and real commitment. The artistic community on objkt cannot be reduced to symbolic value: it is the foundation of the entire ecosystem.
This letter aims to open a shared path, but it also makes it clear that this path must begin now.
`;


export const generateLetter = async (recipient: string, signature: string, complaint: string, tone: Tone, letterLength: LetterLength): Promise<string> => {
  const lengthInstruction = {
    'Pithy': 'The letter should be extremely brief, just one or two powerful sentences.',
    'Short': 'The letter should be a single, concise paragraph.',
    'Medium': 'The letter should be of a moderate length, around 2-3 paragraphs.',
    'Long': 'The letter should be quite verbose, around 4-5 paragraphs, similar to the example provided.',
    'Verbose': 'The letter should be incredibly lengthy and rambling, with at least 6-7 paragraphs, really dragging out the complaint.'
  }[letterLength];
  
  const systemInstruction = `
You are an AI assistant specializing in satirical writing. Your primary task is to write a hilariously formal and serious open letter about a trivial "problem" provided by the user.

**Style Guide:**
Your main inspiration is the following real, serious open letter written by artists to an online art marketplace. You must mimic its structure, vocabulary, and deadpan serious tone. The humor comes from applying this level of gravity to a silly complaint.

---
${originalLetter}
---

**General Rules:**
1.  **Structure:** Follow the example's structure: opening dialogue, stating the problem's importance, acknowledging the recipient's work (can be passive-aggressive depending on tone), explaining community impact, and proposing absurdly formal solutions (for longer letters).
2.  **Language:** Use intelligent, formal language. Avoid nonsensical art-speak. The humor is in the misapplication of seriousness.
3.  **Proposals:** Make any proposed solutions comically overblown and bureaucratic.
4.  **No Real-World Targets:** Do not mention "objkt.com" or any real entities besides what the user provides.
5.  **Formatting:** The letter must begin with "Open Letter to [Recipient]" and end with a closing salutation followed by the signature on a new line.
`;

  const userPrompt = `
Generate an open letter with the following specifications:

- **Recipient:** ${recipient}
- **Signature:** ${signature}
- **The Trivial Complaint:** "${complaint}"
- **Tone to adopt:** "${tone}"
- **Length:** ${letterLength} (${lengthInstruction})

**Tone-Specific Instructions & Closing Salutations:**
- **Serious & Formal:** Extremely dry humor. Stick closely to the style guide's dignified tone. Use a closing like "With respect and with hope," or "Sincerely,".
- **Slightly Unhinged:** Emotionally charged, frantic language within a formal structure. Use dramatic punctuation. Use a closing like "With a mixture of terror and anticipation," or "Yours, in a state of creative crisis,".
- **Passive-Aggressive:** Backhanded compliments and thinly veiled insults. Use a closing with a subtle bite, like "Awaiting a... satisfactory response," or "With all due consideration,".
- **World-Weary & Cynical:** Tone of profound exhaustion and resignation. Use a closing like "Yours, in perpetual disappointment," or "With what little energy we have left,".
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: userPrompt }] },
        config: {
            systemInstruction: systemInstruction,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating letter:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate letter from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
