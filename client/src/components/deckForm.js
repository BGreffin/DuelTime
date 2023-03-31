import React, {useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const DeckForm = (props) => {
    const [deckName,setDeckName] = useState("");
    const [deckSize,setDeckSize] = useState("");
    const [deckType,setDeckType] = useState("");
    const [errors, setErrors] = useState({});

    const {userName} = useParams();
    const navigate = useNavigate();

    const handleDeckName = (e) => {
        e.preventDefault();
        setDeckName(e.target.value);
    }

    const handleDeckSize = (e) => {
        e.preventDefault();
        setDeckSize(e.target.value);
    }

    const handleDeckType = (e) => {
        e.preventDefault();
        setDeckType(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/duelists/${userName}/create`,{deckName,deckSize,deckType,user: userName,cards: []})
            .then((res) => {console.log(res);navigate(`/api/duelists/${userName}/clib`)})
            .catch((err) => {console.log(err.response.data.err.errors);setErrors(err.response.data.err.errors)})
    }

    const logout = e => {
        axios.post(`http://localhost:8000/api/duelists/${username}/logout`)
            .then((res) => navigate("/"))
            .catch((err) => console.log(err))
    };

    const btncreate = {
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '#93C572',
        padding: '10px',
        border: '2px solid #008CBA',
        borderRadius: '5px',
        fontSize: '16px',
        boxShadow: '5px',
    }

    const btnmenu = {
        margin: '5px',
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '#dfe8f2',
        padding: '10px',
        border: '2px solid #000000',
        borderRadius: '5px',
        fontSize: '16px',
        boxShadow: '5px',
    }

    return (
        <div>
            <div style={{display:'flex',flexDirection:'row',alignContent:'center', backgroundColor: '#999999',justifyContent:'space-between',borderRadius: '10px',padding:'15px',width: '90% vw'}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <Link to={`/api/duelists/`+ userName + "/decks"} style={{margin: '10px'}}><button style={btnmenu}> Deck Library </button></Link>
                    <Link to={`/api/duelists/`+ userName + "/clib"} style={{margin: '10px'}}><button style={btnmenu}> Card Library </button></Link>
                </div>
                <div style={{display:'flex',flexDirection:'row',margin: '10px'}}>
                    <Link to={`/api/duelists/`+ userName} style={{margin: '10px'}}><button style={btnmenu}> Return to Home </button></Link>
                    <button style={btnmenu} onClick={logout}> Logout </button>
                </div>
            </div>
            <h1 style={{textAlign:'center'}}>Welcome {userName}</h1>
            <form onSubmit={onSubmitHandler} style={{border: '2px solid #00000', padding: '10px'}}>
                <label>Deck Name: 
                    <input type="text" name="deckName" value={deckName} onChange={handleDeckName} style={{marginLeft: '10px'}} /> 
                </label>
                { errors.deckName ? <p>{errors.deckName.message}</p> : null}<p/><p/>
                <label>Deck Size: 
                    <input type="number" name="deckSize" value={deckSize} min="40" max="60" step="1" onChange={handleDeckSize} style={{marginLeft: '10px'}} ></input>
                </label>
                { errors.deckSize ? <p>{errors.deckSize.message}</p> : null}<p/><p/>
                <label>Deck Type: 
                    <select name="deckType" id="deckType" onChange={handleDeckType} style={{marginLeft: '10px'}} >
                        <option value='Aggro'>Aggro</option>
                        <option value='Combo'>Combo</option>
                        <option value='Control'>Control</option>
                        <option value='Hybrid'>Hybrid</option>
                        <option value='Midrange'>Midrange</option>
                    </select>
                </label>
                { errors.deckType ? <p>{errors.deckType.message}</p> : null}<p/><p/>
                <input type="submit" value="Create Deck" style={btncreate}/>
            </form>
        </div>
    );
}

export default DeckForm;