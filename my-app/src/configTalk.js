import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    initialMessages: [createChatBotMessage(`Hi, how are you today?`)],
    botName: "R_Emote",
    state: {
        numberOfMessages: 0,
        URL: "/"
    }
}

export default config;