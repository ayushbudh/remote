import React, { useState, useRef } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom'
import ParticlesBg from "particles-bg";
import { BsPeopleFill } from "react-icons/bs";
import { makeStyles } from '@material-ui/styles';
import { Input, TextField, Button } from '@material-ui/core';

const Login = () =>{
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

    const useStyles = makeStyles((theme) => ({
     jumbotron:{
          margin: 0,
          backgroundColor: 'black',
          color: 'white',
          height: '5rem',
          paddingTop: '2rem',
          boxShadow:'0px 0px 30px 3px grey',          
        },
        formcontainer: {
          backgroundColor: '#ededed',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '30rem',
          height: '30rem',
          borderRadius: '20px',
          boxShadow:'0px 0px 30px 3px grey',
          marginTop:'6rem'
        },
        header:{
            paddingTop:'2rem',
            marginBottom:'6rem',
        },
        btn:{
            marginTop:'1rem',
            margin:'1rem',
        },
    }));

    const classes = useStyles();

    return (
        <div className="loginform">
            <ParticlesBg type="cobweb" bg={true} />
            <h1 className={classes.jumbotron} ><BsPeopleFill  /> Remote</h1><br />
            <div>
            <form onSubmit={onSubmit} className={classes.formcontainer}>        
                    <h1 className={classes.header}>Login</h1>
                    <formfields className={classes.fields}>
                    <TextField
                        type="text"
                        name="name"
                        value={name}
                        onChange={onNameChange}
                        label="Your Name"
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.btn}>Login</Button>
                   </formfields>
            </form>
            </div>
        </div>
    );
}

export default Login;