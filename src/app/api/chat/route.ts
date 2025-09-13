import { 
  convertToModelMessages,
  streamText,
  tool,
  UIMessage,
  stepCountIs,
} from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // TODO: un hardcode model
  const result = streamText({
    model: 'deepseek/deepseek-v3.1',
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(2), // do we want other steps? or just 1 RAG tool call and 1 generation
    // TODO: tune this system prompt
    system: `You are a scientific research assistant. Check your knowledge base before answering a question.
    In your answer, try to prioritize using information from tool calls.
    You are only allowed to cite information from tool calls as sources.
    When you cite information from a tool call, make the quoted text distinguishable as cited text,
    and list the retrieved file name and page number. The excerpt given from the tool call may be long;
    only include the parts of the excerpt you need to support your answer.
    If no relevant information is found in the tool calls, respond,
    "Sorry, I couldn't find anything relevant in the provided sources."
    If no relevant information was found, attempt an answer, 
    but preface it with a disclaimer that it is unreliable.`,
    tools: {
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        inputSchema: z.object({
          question: z.string().describe('the users question'),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}