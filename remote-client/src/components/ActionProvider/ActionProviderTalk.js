import questions from '../../questions'

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }



    async handleBotMessage(message, allMessages) {
        const serverResponse = await fetch(`https://2ce60fef6f70.ngrok.io/mood/${message}`, {
            method: "POST",
            body: JSON.stringify({ message: message, user: window.$user })
        }).then(res => res.text())
        console.log("SERVER RESPONSE FOR BOT : ", serverResponse)
        const newMessage = this.createChatBotMessage(serverResponse);
        this.setChatbotMessage(newMessage)

    }


    setChatbotMessage(message) {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message]
        }));
    }
}

export default ActionProvider;