export function request(ctx) {
  const prompt = ctx.args.prompt;

  return {
    resourcePath: `/model/${ctx.env.MODEL_ID}/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        prompt: prompt,
        maxTokens: 512,
        temperature: 0.7,
        topP: 0.9,
        stopSequences: []
      }
    }
  };
}

export function response(ctx) {
  const body = JSON.parse(ctx.result.body);
  // Check if body.completion exists (Nova format)
  if (body.completion) {
    return body.completion;
  }
  // Fallback to original format if needed
  return body.results?.[0]?.outputText || "I couldn't generate a response";
}