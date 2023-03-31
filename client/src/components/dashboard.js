import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Dashboard = (props) => {
    const [decks,setDecks] = useState([]);
    const [adeck,setAdeck] = useState();
    const [cards,setCards] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const [newCards,setNewCards] = useState([]);

    const {userName} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/duelists/decks')
            .then((res) => {setDecks(res.data)})
            .catch((err)=> console.log(err))
    }, []);

    const logout = e => {
        axios.post(`http://localhost:8000/api/duelists/${userName}/logout`)
            .then((res) => navigate("/"))
            .catch((err) => console.log(err))
    };

    const active = e => {
        axios.get(`http://localhost:8000/api/duelists/${userName}/`+ e.target.value)
            .then((res) => { setCards(res.data.cards); setNewCards(res.data.cards); setAdeck(res.data); setLoaded(true)})
            .catch((err) => console.log(err))
    }

    const textarea = {
        width: 'auto',
        height: 'auto',
        padding: '12px',
        boxSizing: 'border-box',
        border: '2px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f8f8f8',
        fontSize: '16px',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'row',
        margin: '10px',
    }

    const deleteDeck = e => {
        axios.delete('http://localhost:8000/api/deck/' + e.target.value)
            .then( (res) => window.location.reload() )
            .catch( (err) => console.log(err))
    }

    const deleteCard = e => {
        var newCards2 = newCards;
        newCards2 = newCards2.filter(value => value[0] !== e.target.value);
        console.log(newCards);
        axios.put(`http://localhost:8000/api/duelists/`+ userName +`/edit/${adeck._id}`,{deckName: adeck.deckName,deckSize: adeck.deckSize,deckType: adeck.deckType,cards: newCards2})
                    .then((res) => {setNewCards(newCards2);console.log(res.data)})
                    .catch((err) => {console.log(err.response);setErrors(err.response.data.errors)})
        document.getElementById(e.target.value).style.display = 'none';
    }

    const btndelete = {
        margin: '5px',
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '#CD5C5C',
        padding: '10px',
        border: '2px solid #000000',
        borderRadius: '5px',
        fontSize: '16px',
        boxShadow: '5px',
    }

    const btnupdate = {
        margin: '5px',
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '#FFC300',
        padding: '10px',
        border: '2px solid #000000',
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

    const btndecks = {
        margin: '5px',
        textAlign: 'center',
        color: '#000000',
        padding: '10px',
        border: '2px solid #000000',
        borderRadius: '5px',
        fontSize: '16px',
        boxShadow: '5px',
    }

    return (
        <div style={{margin:'10px',width: '90% vw'}}>
            <div style={{display:'flex',flexDirection:'row',alignContent:'center', backgroundColor: '#999999',justifyContent:'space-between',borderRadius: '10px',padding:'15px'}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <Link to={`/api/duelists/`+ userName + "/decks"} style={{margin: '10px'}}><button style={btnmenu}> Deck Library </button></Link>
                    <Link to={`/api/duelists/`+ userName + "/clib"} style={{margin: '10px'}}><button style={btnmenu}> Card Library </button></Link>
                </div>
                <div style={{display:'flex',flexDirection:'row',margin: '10px'}}>
                    <button style={btnmenu} onClick={logout}> Logout </button>
                </div>
            </div>
            <h1 style={{textAlign:'center'}}>Welcome {userName}</h1>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-around'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <h2 style={{textAlign:'center'}}>My Decks</h2>
                    { decks?
                    <ul>
                        {decks.map((deck,index) => (
                                <li key={index} style={{margin: '5px',textAlign: 'center'}}>
                                    { userName===deck.user ? <button onClick={active} value={deck._id} style={btndecks}>{deck.deckName}</button> : 
                                    <p>{deck.deckName}</p>}
                                </li> ))
                        }
                    </ul> : null
                    }
                    <Link to={`/api/duelists/` + userName + `/create`} style={btnupdate}> Create a Deck </Link>
                </div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center', padding:'20px'}}>
                    { (adeck && loaded)?
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}} id='cardSection'>
                            <h2>{adeck.deckName}: Card Book</h2>
                            <div style={textarea}>
                                {cards.map((card,index) => (
                                    <div key={index} style={{margin:'10px',textAlign:'center'}} id={card[0]}>
                                        <img src={card[1]} style={{width:"35%"}}></img>
                                        <p>{card[0]}</p>
                                        <button onClick={deleteCard} style={btndelete} value={card[0]}> Remove from Deck </button>
                                    </div>
                                ))}
                            </div>
                        </div> : null
                    }
                    { adeck ? 
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                            <h3>Notes for {adeck.deckName}</h3>
                            <textarea style={textarea}></textarea>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Link to={`/api/duelists/`+ userName + `/edit/` + adeck._id} style={btnupdate}> Update </Link>
                                <button onClick={deleteDeck} style={btndelete} value={adeck._id}> Delete </button>
                            </div>
                        </div> : null 
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;