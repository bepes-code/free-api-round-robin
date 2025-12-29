import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { AIService, ChatMessage } from "../types";
const cerebras = new Cerebras({
  apiKey: process.env['CEREBAS_API_KEY']
});
export const cerebrasService: AIService = {
  name: "cerebras",
  async chat(messages: ChatMessage[]) {
    const stream = await cerebras.chat.completions.create({
        messages: messages as any,
        model: 'llama3.1-8b',
        stream: true,
        max_completion_tokens: 2048,
        temperature: 0.2,
        top_p: 1
    });

    return (async function* () { 
      for await (const chunk of stream) {
        yield chunk.choices[0]?.delta?.content || ""
      }
    })()
}
};