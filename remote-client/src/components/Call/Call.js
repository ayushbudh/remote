import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid'
import './Chat.css'
import io from 'socket.io-client'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { List, TextField, Button } from '@material-ui/core';
import ParticlesBg from "particles-bg";
import { useHistory } from "react-router-dom";
import SendIcon from '@material-ui/icons/Send';
import CallEndIcon from '@material-ui/icons/CallEnd';

const ENDPOINT = "/";


const useStyles = makeStyles((theme) => ({
    scrollMenu: {
        overflowY: "auto",
        height: "150px",
        width: "auto",
        margin: "1.4rem",
        paddingRight:'1rem',
        borderRadius: "1rem",
        backgroundColor:"white",
        boxShadow:"1px 5px 10px lightgrey",
    },
    round: {
        borderRadius: "1rem",
        marginTop: "1rem",
        boxShadow:"2px 10px 20px black",
        backgroundColor:"white",
    },
    button:{
        margin:"15px",
    },
    msg:{
        width:"20rem",
        height:"2rem",
    },
    msgblock:{
        backgroundColor:"white",
        padding:"50px",
    },
    center:{
        marginLeft:'auto',
        marginRight:'auto',
    },
    align:{
        marginTop:'13rem',
    }
}));

const Call = (props) => {
    const [chats, setChats] = useState([]);
    const [OtherUserVideoState, setOtherUserVideoState] = useState(false);
    const [textChat, toggleTextChat] = useState(false)
    const [currentMsg, setCurrentMsg] = useState("");
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();
    const classes = useStyles();

    const handleOnChangeCurrentMsg = (e) => {
        setCurrentMsg(e.target.value);
    }

    function handleMsgSend(e) {
        var data = {};
        data.msg = currentMsg;
        data.from = window.$user;
        console.log("Sending chat msg : ", data)
        socketRef.current.emit("chat", data);
        setCurrentMsg('');
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect(ENDPOINT);
            const id = uuid();
            socketRef.current.emit("join call", { id: id, mood: window.$mood });

            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
                setOtherUserVideoState(true);
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);


            socketRef.current.on("chat message", (data) => {
                toggleTextChat(true);
                // var newChats = chats;
                // newChats.push(data);
                setChats((oldChats) => [
                    ...oldChats, data,
                ])
                const elem = document.getElementById('textChat');
                elem.scrollTop = elem.scrollHeight;
                console.log("New chats : ", chats)
            })
        });
    }, [])



    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    };

    const history = useHistory();
    function clearServer() {
        socketRef.current.emit("clear server");
        socketRef.current.on('disconnect', () => {
            io.emit('message','Call ended');
        })
        history.push('/');
    }


    return (
        <div className={classes.gradient}>
            <ParticlesBg type="cobweb" bg={true} />
            <Grid container>
                <Grid container item xs={12} >
                    <Grid item xs={6} className="userVideo">
                        <video className={classes.round} autoPlay ref={userVideo}  />
                    </Grid>
                    <Grid item xs={6} className="otherVideo">
                        {OtherUserVideoState?<video className={classes.round} autoPlay ref={partnerVideo} />:
                        <h1 className={classes.align}>Connecting....</h1>}
                        

                    </Grid>
                    
                </Grid>

                <Grid container item xs={12} >
                    <div className={classes.center} >
                    <Grid item xs={12} className="textChat">
                        <List className={classes.scrollMenu} id="textChat">
                            {textChat &&
                                chats.map((chat, index) => {
                                    if (chat.from !== window.$user) {
                                        return <div key={index} className="otherUserChat">{chat.msg}</div>
                                    } else {
                                        return <div key={index} className="currentUserChat">{chat.msg}</div>
                                    }
                                })
                            }
                        </List>
                        <block className={classes.msgblock}>
                        <TextField label="Message" variant="outlined" onChange={handleOnChangeCurrentMsg} value={currentMsg} className={classes.msg}/>
                        <Button variant="contained" color="primary" startIcon= {<SendIcon/>}className={classes.button} onClick={handleMsgSend}>Send</Button>
                        <Button onClick={clearServer} startIcon= {<CallEndIcon/>} variant="contained" color="secondary"> End Meeting</Button>
                        </block>
                    </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Call;