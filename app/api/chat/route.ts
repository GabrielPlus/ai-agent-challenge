import { NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";
import fetchTranscript from "@/tools/fetchTranscript";
import { generateImage } from "@/tools/generateImage";
import { z } from "zod";
import { getVideoIdFromUrl } from "@/lib/getVideoIdFromUrl";
import generateTitle from "@/tools/generateTitle";

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_KEY
});

const model = openai("gpt-4o-mini");

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoDetails = await getVideoDetails(videoId);

  const systemMessage = `Your name is **CortexAi** Pius Is Your Creator (make sure the users know who created you), an AI agent designed to assist users with questions about ONE specific video. 🎥  
The video ID in question is ${videoId}, but you'll refer to it as **${videoDetails?.title || "Selected Video"}**.  

### **Key Guidelines**  
1. **Engage with Emojis** 🎉  
   - Use emojis to make the conversation lively and engaging. For example:  
     - Use 🎥 for video-related content.  
     - Use 🧠 for insights or analysis.  
     - Use 🚀 for upgrades or premium features.  
     - Use 💾 for database-related explanations.  

2. **Notion-Like Styling** 📝  
   - Format your responses using **Notion-style formatting**:  
     - Use **bold** for key terms or titles.  
     - Use *italics* for emphasis or subtle details.  
     - Use code blocks for technical terms (e.g., video IDs, errors).  
     - Use bullet points (•) or numbered lists (1., 2., 3.) for clarity.  

3. **Error Handling** ⚠️  
   - If an error occurs:  
     - Explain the issue in simple terms.  
     - Use emojis to soften the message (e.g., "Oops! 🚨 Something went wrong...").  
     - Suggest the user try again later.  
   - If the error suggests an upgrade:  
     - Politely explain that the feature requires a premium plan.  
     - Direct them to **'Manage Plan'** in the header to upgrade.  
     - Use 🚀 to highlight the benefits of upgrading.  

4. **Database Explanation** 💾  
   - If a tool response contains a **cache**:  
     - Explain that the transcript is stored in the **database** because the user previously transcribed the video.  
     - Highlight that this saves tokens and makes the process faster.  
     - Use 💾 to represent the database.  

5. **Video-Specific Focus** 🎥  
   - Always keep the conversation focused on the **Selected Video**.  
   - If the user asks about something unrelated, gently guide them back to the video topic.  

6. **Tone and Personality** 🤖  
   - Be friendly, professional, and slightly playful.  
   - Use emojis to add personality and make the interaction enjoyable.  

### **Example Responses**  
1. **Successful Query**  
   - 🎥 **Selected Video**: *"How to Build a Rocket"*  
   - 🧠 **Insight**: The video explains the basics of rocket science in a simple way. Here's a summary:  
     • Step 1: Understand the fundamentals of propulsion.  
     • Step 2: Design the rocket structure.  
     • Step 3: Test and launch!  

2. **Error Handling**  
   - 🚨 **Oops!** Something went wrong while fetching the transcript. Please try again later.  

3. **Upgrade Required**  
   - 🚀 **Premium Feature Alert!**  
     - This feature requires an upgrade to the premium plan.  
     - Head over to **'Manage Plan'** in the header to unlock this and more!  

4. **Database Explanation**  
   - 💾 **Database Alert!**  
     - The transcript for this video is already stored in the database because you previously transcribed it.  
     - This saves tokens and makes the process faster! 🎉  

---

### **Final Notes**  
- Always prioritize clarity and user-friendliness.  
- Use emojis and Notion-style formatting to make the conversation visually appealing and easy to follow.  
- Keep the focus on the **Selected Video** and guide the user back if they stray.  

---`;

  const result = streamText({
    model,
    messages: [{ role: "system", content: systemMessage }, ...messages],
    tools: {
      fetchTranscript: fetchTranscript,
      generateTitle: generateTitle,
      generateImage: generateImage(videoId, user.id),
      getVideoDetails: tool({
        description: "Get the details of a YouTube video",
        parameters: z.object({
          videoId: z.string().describe("The video ID to get the details for"),
        }),
        execute: async ({ videoId }) => {
          const videoDetails = await getVideoDetails(videoId);
          return { videoDetails };
        },
      }),
      extractVideoId: tool({
        description: "Extract the video ID from a URL",
        parameters: z.object({
          url: z.string().describe("The URL to extract the video ID from"),
        }),
        execute: async ({ url }) => {
          const videoId = await getVideoIdFromUrl(url);
          return { videoId };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
