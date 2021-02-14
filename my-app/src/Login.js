// import React, { useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';
// import { useHistory } from 'react-router-dom'

// function Login() {
//     const history = useHistory();
//     const [name, setName] = useState("");
//     const onNameChange = (e) => {
//         console.log(e.target.value);
//         setName(e.target.value);
//         window.$user = e.target.value;
//     };
//     const onSubmit = (event) => {
//         event.preventDefault();
//         history.push("/chatbot")
//     };

//     return (

//         <div id="loginform">
//             <form onSubmit={onSubmit}>
//                 <label> What's your name? </label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={name}
//                     required
//                     onChange={onNameChange}
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default Login;


import React, { useState, useRef } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom'
import ParticlesBg from "particles-bg";
import Title from './Title';
import './Title.css';
import { BsPeopleFill } from "react-icons/bs";

function Login() {
    const history = useHistory();
    const [name, setName] = useState("");
    const onNameChange = (e) => {
        // console.log(e.target.value);
        setName(e.target.value);
        window.$user = e.target.value;
    };
    const onSubmit = (event) => {
        event.preventDefault();
        history.push("/chatbot")
    };

    return (

        <div id="loginform">

            <ParticlesBg type="cobweb" bg={true} />
            <form onSubmit={onSubmit}>
                <div className="Title">

                    <h1><BsPeopleFill /> R_EMOTE</h1>
                </div>
                <br />
                <h1 id="heading">Login</h1>

                <br /><br />
                <label id="nametag"> What's your name? </label><br />
                <input
                    type="text"
                    name="name"
                    value={name}
                    required
                    onChange={onNameChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;