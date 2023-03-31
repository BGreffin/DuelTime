import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";

const DeckList = (props) => {
    const [decks, setDecks] = useState([]);
    const {userName} = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/duelists/decks`)
            .then((res) => { console.log(res.data); setDecks(res.data) } )
            .catch((err) => console.log(err))
    },[])

    const logout = e => {
        axios.post(`http://localhost:8000/api/duelists/${userName}/logout`)
            .then((res) => navigate("/"))
            .catch((err) => console.log(err))
    };

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
                    <Link to={`/api/duelists/`+ userName + "/clib"} style={{margin: '10px'}}><button style={btnmenu}> Card Library </button></Link>
                </div>
                <div style={{display:'flex',flexDirection:'row',margin: '10px'}}>
                    <Link to={`/api/duelists/`+ userName} style={{margin: '10px'}}><button style={btnmenu}> Return to Home </button></Link>
                    <button style={btnmenu} onClick={logout}> Logout </button>
                </div>
            </div>
            <h1 style={{textAlign:'center'}}>Welcome {userName}</h1>
            { decks?
            <div>
                <h2>All Decks</h2>
                    {decks.map((deck,index) => (
                        <div key={index} style={{margin: '10px'}}>
                            <Link to={`/api/duelists/`+ userName + "/decks/show/" + deck._id} style={{margin: '5px'}}>{deck.deckName}</Link>
                        </div>
                        ))
                    } 
            </div> : null
            }
        </div>
    )
}

export default DeckList;