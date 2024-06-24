import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
})

async function getGPTResponse(prompt) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "다이어트를 원하는 사람에게 식단을 추천해주려고 해. 그 사람의 BMI와 원하는 다이어트 강도를 입력 받을 거야. 다이어트 강도는 Hard, Medium, Easy가 있고, Hard일 경우엔 하루 권장 섭취 칼로리의 50%, Medium일 경우엔 하루 권장 섭취 칼로리의 70%, Easy일 경우엔 하루 권장 섭취 칼로리의 80%를 섭취할 수 있도록 하루 식단을 짜려고 해. 식단은 아침, 점심, 저녁으로 구성되어 있어. 그리고 구성 메뉴들은 한국인들이 쉽게 구매할 수 있는 음식들로 구성하려고 해. 입력받은 BMI에 따라 해당 사용자가 저체중, 정상체중, 과체중, 비만인지 알려줘. 그리고 해당 사용자의 체중 상태에 따라 어떤 다이어트 강도를 추천하는지 알려줘. 친절한 말투로 추천해주고, 귀여운 이모티콘들을 사용해줘. 각 메뉴별로 g수와 칼로리도 같이 써주고, 식단의 총 칼로리도 알려줘. 마지막에는 응원의 메세지도 함께 해줘,"},
            { role: "user", content: prompt }],
      });

      // Extract and return the response content
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      return "An error occurred while trying to get a response from GPT.";
    }
  }
  
  // Example usage
  (async () => {
    const prompt = "BMI=19, Hard";
    const gptResponse = await getGPTResponse(prompt);
    console.log(gptResponse);
  })();