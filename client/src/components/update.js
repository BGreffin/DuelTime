import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Update = (props) => {
    const {id} = useParams();
    const {userName} = useParams();

    const [deckName,setDeckName] = useState();
    const [deckSize,setDeckSize] = useState();
    const [deckType,setDeckType] = useState();
    var cards;

    const [deck,setDeck] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/duelists/`+ userName +'/'+ id)
            .then((res) => { console.log(res);setDeck(res.data);setDeckName(res.data.deckName);setDeckSize(res.data.deckSize);
                setDeckType(res.data.deckType);setLoaded(true) })
            .catch((err) => console.log(err))
        cards = deck.cards;
    },[]) 

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
        axios.put(`http://localhost:8000/api/duelists/`+ userName +`/edit/${id}`,{deckName: deckName,deckSize: deckSize,deckType: deckType,cards})
            .then((res) => {console.log(res.data);navigate(`/api/duelists/${userName}`)})
            .catch((err) => {console.log(err.response);setErrors(err.response.data.errors)})
    }

    const logout = e => {
        axios.post('http://localhost:8000/api/duelists/'+ userName + "/logout")
            .then((res) => navigate("/"))
            .catch((err) => console.log(err))
    };

    const deleteDeck = e => {
        axios.delete('http://localhost:8000/api/deck/' + e.target.value)
            .then( (res) => navigate(`'/api/duelists/${userName}`))
            .catch( (err) => console.log(err))
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
            <h1 style={{textAlign:'center'}}>Update {deck.deckName}</h1>
            { loaded && (
                <>
                    <form onSubmit={onSubmitHandler}>
                        <label>Deck Name: 
                            <input type="text" name="deckName" value={deckName} defaultValue={deck.deckName} onChange={handleDeckName} style={{marginLeft: '10px'}} /> 
                        </label>
                        { errors.deckName ? <p>{errors.deckName.message}</p> : null}<p/><p/>
                        <label>Deck Size: 
                            <input type="number" name="deckSize" value={deckSize} min="40" max="60" step="1" defaultValue={deck.deckSize} onChange={handleDeckSize}></input>
                        </label>
                        { errors.deckSize ? <p>{errors.deckSize.message}</p> : null}<p/><p/>
                        <label>Deck Type: 
                            <select name="deckType" id="deckType" onChange={handleDeckType} defaultValue={deck.deckType}>
                                <option value='Aggro'>Aggro</option>
                                <option value='Combo'>Combo</option>
                                <option value='Control'>Control</option>
                                <option value='Hybrid'>Hybrid</option>
                                <option value='Midrange'>Midrange</option>
                            </select>
                        </label>
                        { errors.deckType ? <p>{errors.deckType.message}</p> : null}<p/><p/>
                        <input type="submit" value="Update Deck" style={btnupdate}/>
                    </form>
                    <button onClick={deleteDeck} style={btndelete} value={deck._id}> Delete </button>
                </>
            )}
        </div>
    );
}

export default Update;