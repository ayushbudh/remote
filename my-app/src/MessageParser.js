class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message) {
        this.actionProvider.handleBotMessage(message, this.state.messages);
    }
}

export default MessageParser;