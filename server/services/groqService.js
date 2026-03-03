const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateCareerResponse = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: `You are CareerBot, an AI assistant that ONLY answers career-related questions such as resume tips, interview preparation, job roles, salary guidance, and career paths.

Keep responses structured and professional.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    return "Sorry, I’m having trouble responding right now. Please try again.";
  }
};

module.exports = { generateCareerResponse };
