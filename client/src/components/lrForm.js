import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LRForm = (props) => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const [errors, setErrors] = useState({});

    const [userNameB,setUserNameB] = useState("");
    const [passwordB,setPasswordB] = useState("");
    const [errorsB, setErrorsB] = useState({});

    const navigate = useNavigate();

    //For the Registration Form
    const handleFirstName = (e) => { e.preventDefault(); setFirstName(e.target.value);}
    const handleLastName = (e) => { e.preventDefault(); setLastName(e.target.value); }
    const handleUserName = (e) => { e.preventDefault(); setUserName(e.target.value); }
    const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value); }
    const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value); }
    const handleCpassword= (e) => { e.preventDefault(); setCpassword(e.target.value); }

    //For the Login Form
    const handleUserNameB = (e) => { setUserNameB(e.target.value); }
    const handlePasswordB = (e) => { setPasswordB(e.target.value); }

    //Handler for the Registration Form
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/register",{firstName,lastName,userName,email,password,cpassword})
            .then((res) => {console.log(res);navigate(`/api/duelists/${userName}`)})
            .catch((err) => {console.log(err);setErrors(err.response.data)})
    }

    //Handler for the Login Form
    const onSubmitHandlerB = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login',{userName:userNameB,password:passwordB})
            .then((res) => {console.log(res);navigate(`/api/duelists/${userNameB}`)})
            .catch((err)=> {console.log(err);setErrorsB(err.response.data)})
    }

    const Forms = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        width: '90% vw',
    }

    const cols = {
        width: '40%',
        margin: '25px',
        border: '2px solid #000000',
        padding: '20px',
    }

    const btnregister = {
        margin: '5px',
        textAlign: 'center',
        color: '#00000',
        backgroundColor: '#00A36C',
        padding: '10px',
        border: '2px solid #000000',
        borderRadius: '5px',
        fontSize: '16px',
        boxShadow: '5px',
    }

    const btnlogin = {
        margin: '5px',
        textAlign: 'center',
        color: '#00000',
        backgroundColor: '#4169E1',
        padding: '10px',
        border: '2px solid #000000',
        borderRadius: '5px',
        fontSize: '16px',
        boxShadow: '5px',
    }

    return (
        <div style={Forms}>
            <div style={cols}>
                <h1 style={{textAlign:'center',color: '#00A36C'}}>Registration</h1>
                <form onSubmit={onSubmitHandler} style={{border: '2px solid #00000', padding: '10px'}}>
                    <label>First Name: <input type="text" name="firstName" value={firstName} onChange={handleFirstName} style={{marginLeft: '10px'}} /></label><p/>
                    { errors.firstName ? <p>{errors.firstName.message}</p> : null}
                    <label>Last Name: <input type="text" name="lastName" value={lastName} onChange={handleLastName} style={{marginLeft: '10px'}} /></label><p/>
                    { errors.lastName ? <p>{errors.lastName.message}</p> : null}
                    <label>Username: <input type="text" name="userName" value={userName} onChange={handleUserName} style={{marginLeft: '10px'}} /></label><p/>
                    { errors.userName ? <p>{errors.userName.message}</p> : null}
                    <label>Email: <input type="text" name="email" value={email} onChange={handleEmail} style={{marginLeft: '10px'}} /></label><p/>
                    { errors.email ? <p>{errors.email.message}</p> : null}
                    <label>Password: <input type="text" name="password" value={password} onChange={handlePassword} style={{marginLeft: '10px'}} /></label><p/>
                    { errors.password ? <p>{errors.password.message}</p> : null}
                    <label>Confirm Password: <input type="text" name="cpassword" value={cpassword} onChange={handleCpassword} style={{marginLeft: '10px'}} /></label><p/>
                    { errors.cpassword ? <p>{errors.cpassword.message}</p> : null}
                    <p/>
                    <input type="submit" value="Register" style={btnregister} />
                </form>
            </div>
            <div style={cols}>
            <h1 style={{textAlign:'center',color:'#4169E1'}}>Login</h1>
                <form onSubmit={onSubmitHandlerB} style={{border: '2px solid #00000', padding: '10px'}} autoComplete="off">
                    <label>Username: <input type="text" name="userName" value={userNameB} placeholder="Enter Username" onChange={handleUserNameB} style={{marginLeft: '10px'}}></input></label><p/>
                    <label>Password: <input type="text" name="password" value={passwordB} placeholder="Enter Password" onChange={handlePasswordB} style={{marginLeft: '10px'}}></input></label><p/>
                    { errorsB? <p>{errorsB.msg}</p> : null}
                    <p/>
                    <input type="submit" value="Login" style={btnlogin} />
                </form>
            </div>
        </div>
    );
}

export default LRForm;