# Remote 
## What it does ?

Remote is a social networking app that uses python sentiment analysis to analyze people mood and help them connect with other people having similar moods.
Remoted platform is a platform that makes easier for people across the globe by connecting with people having similar moods. Remote connects two people via video call in which people can share their feelings. Remote also has chat feature while the video call is in progress.  

## Implementation

I have used Socket.io to connect users based upon their moods. In the second screen of the app asks questions to the user to analyze mood based on the responses. The responses are then processed by the Node.js using the child process module that runs the python script which uses TextBlob NLP library to calculate the polarity( an indicator of feeling) based on the words used in the responses. When the polarity is being calculated the Text Blob library trims the response by removing other irrelevant words and punctuations from the message. The polarity ranges from -1 to 1, where -1 means the user is very sad and 1 as very happy. When the app tries to connect other user it checks for the closest polarity value calculated from the responses input by the other user. Once both of the user is connected they can chat and talk via video call.  

## Built With  

`node.js`
`react.js`
`socket.io`
`react-chatbot-kit`
`textblob-sentiment-analysis`

## Demo

<img width="900" alt="Screen Shot 2021-05-07 at 1 14 03 AM" src="https://user-images.githubusercontent.com/56787472/117504041-78410d00-af47-11eb-8b99-dfea77ab1254.png">
<img width="900" alt="Screen Shot 2021-05-07 at 1 16 16 AM" src="https://user-images.githubusercontent.com/56787472/117504047-79723a00-af47-11eb-877f-bbe3a83ff451.png">
<img width="900" alt="Screen Shot 2021-05-07 at 1 19 39 AM" src="https://user-images.githubusercontent.com/56787472/117504080-868f2900-af47-11eb-8d9d-f1c9fb5aad82.png">
