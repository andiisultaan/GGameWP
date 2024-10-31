const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = async gameName => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `give me 8 recommendations of games that are similar to ${gameName},response must be a format JSON. create without \`\`\`json and \`\`\` make like 
  [
    {
        name : "game name"
    }
  ]`;

  const result = await model.generateContent(prompt);

  const response = await result.response;
  let text = response.text();

  //   console.log(text);
  text = JSON.parse(text.trim());
  return text;
};

module.exports = gemini;
