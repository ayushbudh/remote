import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Chatbot } from 'react-chatbot-kit'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import config from './config'
import io from "socket.io-client";


function ChatbotComponent(props) {
    const [mood, setMood] = useState(null);
    const [showBot, toggleBot] = useState(true);
    const [option, setOption] = useState(false);
    let socket = null;
    const history = useHistory();


    useEffect(() => {
        const url = "/";
        socket = io(url);

        socket.emit("online", window.$user)
        socket.on("connect", (msg) => {
            console.log("CLIENT CONNECTED");
        })
        socket.on("message", (msg) => {
            console.log("MSG IS : ", msg);
        });
        socket.on("set mood", (mood) => {
            console.log("You are : ", mood);
            setMood(mood); // mood here is the mood recieved from the server
            window.$mood = mood;
            console.log("Set option")
            setOption(true)

            toggleBot(false);
            history.push("/call")
        });
        return () => {
            socket.disconnect();
        }


    }, [])

    // function handleChatWithBot() {
    //     // staying on the same page
    //     console.log("yaha aya 1")
    //     setOption(false);
    //     history.push("/talktobot")
    // }

    // function handleChatWithRealPerson() {
    //     console.log("yaha aya 2")
    //     history.push("/call")
    // }

    return (
        <div>
            <header className="App-header">
                {showBot &&
                    <Chatbot
                        config={config}
                        actionProvider={ActionProvider}
                        messageParser={MessageParser}
                    />
                }

                {/* {option &&
                    <ButtonGroup color="primary">
                        <Button onClick={handleChatWithRealPerson}> Chat with a real person </Button>
                        <Button onClick={handleChatWithBot}> Chat with the bot </Button>
                    </ButtonGroup>
                } */}

            </header>
        </div>
    )
}

export default ChatbotComponent;