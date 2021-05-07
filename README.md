# Remote 
## Inspiration
‘I’m fine.’ That is usually how people answer when we ask them how they are doing. But what we want to know is how they are really feeling.

The pandemic and global lockdown has definitely a big impact on our mental health. Fear and anxiety about the virus is very overwhelming. While the reactions may vary from person to person, it is important to remember that whatever they may be feeling right now, it is absolutely valid and there are people with whom they can share it.

Many people feel that sharing their experiences can help them feel better. However some of them are lonely and don’t know who to talk to. They need someone who they can share their emotions with, without any judgement. Talking to a stranger might make them feel less pressured.

We want to make a safe environment for people to share how they are coping. Other social media platforms such as Instagram and Facebook are not helping. People only post their positive and happy side of things and hide their real emotions. We want to create the opposite, where there are no likes, bragging or jealousy, just people sharing how they really feel and supporting each other. We want to let people know that they are not alone.

The name Remote comes from remote (distant) and emote (to show emotion in a way that makes it clear what you are feeling).

## What it does
The website will ask a series of questions to establish the mood of the person. This could be happy, angry, sad, scared, surprised or flirty. The site will then pair the person with another person with the same mood to chat or video chat with them. If the person does not want to talk to another human being it can also talk to a chatbot.

We wanted to focus on mental health. Therefore we also included some contact info of helplines that could help with more serious problems (e.g. suicide, depression, abuse, covid-19 questions…) and offer professional help.

## How we built it
We built a website, a mood detection model and a matching algorithm. We used TensorFlow and NLTK to build a model that helps us analyse the mood of the person through a small chat, this was connected to the main website with RESTapi using FLASK. The main Website used MONGODB to store the current mood and has a matching algorithm to connect people with similar moods, the entire website was built using REACT.js and NODE.js.

## Challenges we ran into
1)Training the Machine Learning model to understand the mood properly. 2)Connecting the Backend and the Machine Learning models. 3)Including the chat option. 4)Setting up WebRTC handshake for video chat 5)Researching how to connect people. 6)Coordination between the timezones (India, USA and Europe).

## What’s next?
In the future we would want to elaborate the emotions, make more of them and make them more complex. Another feature we would like to develop is a filter for chats. People who are sad do not always want to communicate with a sad person, but rather to connect with someone who is happy and can cheer them up. People could choose what type of person they want to chat with.

We also want to further elaborate the chatbot, with more phrases and questions to make the conversation more dynamic.

Mental health is very important that is why we included the helplines. We could take this a step further by sending a message containing the numbers for the hotlines everytime certain words are mentioned (e.g. suicide, abuse, crime, depression…).

## Built With  

`node.js`
`react.js`
`react-chatbot-kit`
`textblob-sentiment-analysis`
