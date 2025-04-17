import EpisodeCard from "../components/episodeCard";
import { useEffect, useState, useReducer, act } from "react";
import { useParams } from "react-router-dom"
import styles from "../style/characterCard.module.css";
import { type } from "@testing-library/user-event/dist/type";

export default function SingleEpisode(){
    const id = useParams().id;
    const charactersLikes = localStorage.getItem(`episode${id}`) !== null; 
    const [episode, setEpisode] = useState({});
    const [characters, setCharacters] = useState([]);
    const favouriteCharacters = [...characters].sort((a, b) => b.likes - a.likes);
    const [likes, dispatch] = useReducer(likeReducer, {})
    const addLike = (char, allChar) =>{
        console.log("+",char);
        dispatch({type: "add", payload: {char: char, allChar: allChar, id: id}});
    };

    const subLike = (char, allChar) =>{
        console.log("-",char);
        dispatch({type: "sub", payload: {char: char, allChar: allChar, id: id}});
    };
    
    

    useEffect(()=>{
        const fetchEpisode = async () => {
            const data = await getEpisodeById(id);
            setEpisode(data);
        }
        fetchEpisode();
    },[])
    
    useEffect(()=>{
        if(charactersLikes){
            const storedCharacters = JSON.parse(localStorage.getItem(`episode${id}`));
            setCharacters(storedCharacters);
            return;
        }
        const fetchCharacters = async () => {
            const episode = await getEpisodeById(id);
            const characters = episode.characters;
            const selectedCharacters = [
                ...characters.slice(0, 2),
                ...characters.slice(-2)

            ]
            const characterData = await getCharacters(selectedCharacters);
            characterData.map((character) => {
                character.likes = 0;
            });
            localStorage.setItem(`episode${id}`, JSON.stringify(characterData));
            setCharacters(characterData);
        }
        if (episode.characters) {
            fetchCharacters();
        }
    }, [episode.characters])


    return(
        <div>
            <div className={styles.characters_container + " " + styles.fav}>
                {favouriteCharacters && favouriteCharacters.slice(0,2).map((character) => {
                    return (
                        <div key={character.id}>
                            <img src={character.image} alt={character.name} />
                            <p>{character.name}</p>
                            <p>{character.likes}</p>
                        </div>
                    )
                })}
            </div>
            <EpisodeCard 
                id={episode.id}
                name={episode.name}
                air_date={episode.air_date}
                episode={episode.episode}>
            </EpisodeCard>

            <div className={styles.characters_container}>
                {characters && characters.map((character) => {
                    return (
                        <div key={character.id}>
                            <img src={character.image} alt={character.name} />
                            <p>{character.name}</p>
                            <p>{character.likes}</p>
                            <button onClick={() => addLike(character, characters)}>Like</button> <button onClick={() => subLike(character, characters)}>Dislike</button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

async function getCharacters(characters) {
    const characterData = await Promise.all(characters.map((character) => {
        return fetch(character).then((res) => res.json()).then(({ id, name, image }) => ({ id, name, image }))
    }))
    return characterData;
}

async function getEpisodeById(id) {
    const episode = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    if (!episode.ok) {
        throw new Error("Failed to fetch episode")
    }
    return episode.json()
}

function likeReducer(state, action){
    if(action.type === "add"){
        action.payload.char.likes += 1;
        localStorage.setItem(`episode${action.payload.id}`, JSON.stringify(action.payload.allChar));
        return action.payload.char.likes;
    }

    if(action.type === "sub"){
        if(action.payload.char.likes <= 0) return;
        action.payload.char.likes -= 1;
        localStorage.setItem(`episode${action.payload.id}`, JSON.stringify(action.payload.allChar));
        return action.payload.char.likes;
    }
}

