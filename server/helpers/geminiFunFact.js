const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiFunFact = async gameName => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `give me fun fact about this game ${gameName}. response must be a format JSON. create without \`\`\`json and \`\`\``;

  const result = await model.generateContent(prompt);

  const response = await result.response;
  let text = response.text();

  //   console.log(text);
  text = JSON.parse(text.trim());
  return text;
};

module.exports = geminiFunFact;
