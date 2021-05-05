import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Chatbot } from 'react-chatbot-kit'
import MessageParserTalk from '../MessageParser/MessageParserTalk'
import ActionProviderTalk from '../ActionProvider/ActionProviderTalk'
import configTalk from '../Config/configTalk'

const ChatbotComponent = (props) =>{
    const [mood, setMood] = useState(null);
    const [showBot, toggleBot] = useState(true);
    const [option, setOption] = useState(false);
    let socket = null;
    const history = useHistory();

    return (
        <div>
            <header className="App-header">
                {showBot &&
                    <Chatbot
                        config={configTalk}
                        actionProvider={ActionProviderTalk}
                        messageParser={MessageParserTalk}
                    />
                }
            </header>
        </div>
    )
}

export default ChatbotComponent;