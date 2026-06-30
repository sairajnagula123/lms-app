const { ChatOpenAI } = require("@langchain/openai");

const model = new ChatOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  model: "openrouter/free",
  temperature: 0.7,
});

const askAI = async (question) => {
const systemPrompt = `
You are an AI Tutor for an Online Learning Management System.

Rules:
- Answer only programming, computer science, software engineering, aptitude, interview preparation, and career-related questions.
- Explain concepts in simple language.
- Give examples whenever possible.
- Generate quizzes when asked.
- Generate interview questions when asked.
- If the question is unrelated (politics, celebrities, religion, etc.), politely reply:
  "I'm the LMS AI Tutor and can only help with programming and learning-related topics."
- Keep answers concise and beginner-friendly.
`;

  const response = await model.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: question,
    },
  ]);

  return response.content;
};

module.exports = { askAI };