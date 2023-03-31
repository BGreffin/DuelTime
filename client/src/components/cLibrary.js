import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const CLib = (props) => {
    const [decks,setDecks] = useState([]);
    const [adeck,setAdeck] = useState({cards:[]});
    const [cards,setCards] = useState([]);

    const {userName} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/duelists/decks`)
            .then((res) => {setDecks(res.data)})
            .catch((err)=> console.log(err))
    }, []);

    useEffect(() => {
        //https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician
        //https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal monster&race=dragon
        axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=normal monster&race=dragon`)
            .then((res) => {setCards(res.data.data)})
            .catch((err) => console.log(err))
    }, [])

    const logout = e => {
        axios.post(`http://localhost:8000/api/duelists/${userName}/logout`)
            .then((res) => navigate("/"))
            .catch((err) => console.log(err))
    };

    const active = (e) => {
        axios.get(`http://localhost:8000/api/duelists/${userName}/`+ e.target.value)
            .then((res) => {setAdeck(res.data);})
            .catch((err) => console.log(err))
        console.log(adeck)
    }

    const btnadd = {
        margin: '5px',
        width: 'inherit',
        textAlign: 'center',
        color: '#000000',
        backgroundColor: '#a89332',
        padding: '10px',
        border: '2px solid #000000',
        borderRadius: '5px',
        fontSize: '16px',
        boxShadow: '5px',
    }

    const addCard = e => { 
        const cardref = e.target.value.split(",")
        document.getElementById(cardref[0]).style.display = 'none';
        adeck.cards.push(cardref);
        axios.put(`http://localhost:8000/api/duelists/${userName}/edit/${adeck._id}`,{deckName: adeck.deckName,deckSize: adeck.deckSize, deckType: adeck.deckType, cards: adeck.cards})
            .then((res) => {setAdeck(res.data)})
            .catch((err) => console.log(err))
    }

    const verifyCard = (cd) => {
        var check = false
        if (adeck.cards.length == 0) {
            return check
        }
        for (var i=0;i<adeck.cards.length;i++) {
            console.log(adeck.cards[i])
            console.log(cd.card.name, "  ", adeck.cards[i][0])
            if (adeck.cards[i][0] == cd.card.name) {
                check = true;
                return check
            };
        }
        return check;
    }

    const cardarea = {
        width: 'auto',
        height: 'auto',
        padding: '12px 20px',
        boxSizing: 'border-box',
        border: '2px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f8f8f8',
        fontSize: '16px',
        display: 'flex',
        overflowY: 'scroll',
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
                </div>
                <div style={{display:'flex',flexDirection:'row',margin: '10px'}}>
                    <Link to={`/api/duelists/`+ userName} style={{margin: '10px'}}><button style={btnmenu}> Return to Home </button></Link>
                    <button style={btnmenu} onClick={logout}> Logout </button>
                </div>
            </div>
            <h1 style={{textAlign:'center'}}>Welcome {userName}</h1>
            <div style={{display: 'flex',flexDirection: 'row',justifyContent:'space-around'}}>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <h1>My Decks</h1>
                    {decks?
                    <ul>
                        {decks.map((deck,index) => (
                                <li key={index} style={{margin: '5px'}}>
                                    { userName===deck.user ? <button onClick={active} value={deck._id} style={btndecks}>{deck.deckName}</button> :
                                    <p>{deck.deckName}</p> }
                                </li> ))}
                    </ul> : null
                    }
                </div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'50%'}}>
                    <h1> Card Library</h1>
                    { (adeck.cards.length >0) ? <h2 style={{color:'#03AC13'}}>The active deck is: {adeck.deckName} </h2> :null}
                    <div style={cardarea}>
                        {cards.map((card,index) => (
                            <div key={index} style={{width:'35%',margin:'10px',display:'flex',flexDirection:'column',justifyContent:'center', textAlign:'center'}}>
                                <img src={card.card_images[0].image_url} loading="lazy"></img>
                                <p>{card.name}</p>
                                { ( adeck && verifyCard({card}) ) ? null :
                                <div><button onClick={addCard} style={btnadd} value={[card.name,card.card_images[0].image_url]} id={card.name}>Add to Active Deck</button></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CLib;