
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
    'Short': 'The letter should be concise, around 2-3 short paragraphs.',
    'Medium': 'The letter should be of a moderate length, around 4-5 paragraphs, similar to the example provided.',
    'Long': 'The letter should be quite verbose and lengthy, with at least 6-7 paragraphs, really dragging out the complaint.'
  }[letterLength];
  
  const prompt = `
You are an AI assistant specializing in satirical writing. Your task is to write a hilariously formal and serious open letter about a trivial "problem."

**Context & Style Guide:**
Here is a real, serious open letter written by artists to an online art marketplace. Use this as your primary guide for the structure, vocabulary, and deadpan serious tone. The humor will come from applying this level of gravity to a silly complaint.

---
${originalLetter}
---

**Your Task:**
Write a satirical open letter that mimics the style of the example above. The core of the satire is the immense gap between the serious tone and the triviality of the user's complaint.

**The Trivial Complaint to Dramatize:**
"${complaint}"

**The Required Tone:**
You must adopt the following persona: "${tone}".
- If "Serious & Formal": Stick very closely to the original letter's dignified, community-focused style. The humor should be extremely dry.
- If "Slightly Unhinged": The language should become more emotionally charged and frantic, while still trying to maintain a formal structure. Use more dramatic punctuation and rhetorical questions.
- If "Passive-Aggressive": Employ backhanded compliments and thinly veiled insults. For example, "While we appreciate the *effort*..." or "It's impossible to ignore the... unique choices made."
- If "World-Weary & Cynical": Write from a perspective of profound exhaustion, as if this is the latest in an endless series of disappointments. The tone is one of resignation, but with a final, desperate plea for sanity.

**Letter Length:**
${lengthInstruction}

**Rules for Generating the Satire:**
1.  **Address and Signature:** The letter MUST start with "Open Letter to ${recipient}" on the first line. It must end with a closing salutation followed by the signature on a new line, like this:
    [Closing Salutation],
    ${signature}
2.  **Tone-Appropriate Closing:** The closing salutation MUST match the selected tone.
    - For "Serious & Formal": Use a dignified closing like "With respect and with hope," or "Sincerely,".
    - For "Slightly Unhinged": Use a dramatic, overwrought closing like "With a mixture of terror and anticipation," or "Yours, in a state of creative crisis,".
    - For "Passive-Aggressive": Use a closing with a subtle bite, such as "Awaiting a... satisfactory response," or "With all due consideration,".
    - For "World-Weary & Cynical": Use a closing that conveys exhaustion, like "Yours, in perpetual disappointment," or "With what little energy we have left,".
3.  **Mimic, Don't Copy:** Follow the structure: opening dialogue, stating the problem's importance, acknowledging the platform's work (perhaps passive-aggressively, depending on tone), explaining how the community is affected, and proposing absurdly formal solutions.
4.  **Intelligent Language, Not Jargon:** Avoid over-the-top, nonsensical art-speak. Use intelligent, formal language that a real artist might use, but apply it to the silly complaint. The humor is in the misapplication of seriousness.
5.  **Proposals:** The list of proposed solutions should be comically overblown and bureaucratic in relation to the actual complaint.
6.  **No Real-World Targets:** Do not mention objkt.com or any real entities besides the user-provided recipient.

Now, generate the letter.
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
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