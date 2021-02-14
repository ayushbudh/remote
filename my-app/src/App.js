import React, { useState, useEffect, useHistory } from 'react';
import Chatbot from './Chatbot'
import ChatbotTalk from './ChatbotTalk'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Call from './Call'


function App() {

    return (
        <div className="App">


            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/chatbot" exact component={Chatbot} />
                    {/* <Route path="/talktobot" exact component={ChatbotTalk} /> */}
                    <Route path="/call" component={Call} />
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;