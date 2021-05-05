import questions from '../../questions'

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    async combineMessages(messages) {
        var combinedMessage = "";
        for (var ii = 0; ii < messages.length; ii++) {
            if (messages[ii].type !== "bot") {
                combinedMessage += (messages[ii].message)
                if (combinedMessage[combinedMessage.length - 1] !== '.') {
                    combinedMessage += ". "
                }
            }
            if (ii == messages.length - 1) {
                return combinedMessage
            }
        }
    }


    async handleBotMessage(message, allMessages) {
        const combinedMessage = await this.combineMessages(allMessages);
        console.log("COMBINED :: ", combinedMessage)
        const serverResponse = await fetch("/", {
            method: "POST",
            body: JSON.stringify({ message: message, user: window.$user, combinedMessage: combinedMessage })
        }).then(res => res.text())
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