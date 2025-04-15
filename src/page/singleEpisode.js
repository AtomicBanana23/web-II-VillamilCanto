import EpisodeCard from "../components/episodeCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styles from "../style/singleEpisode.module.css";

export default function SingleEpisode(){
    const id = useParams().id;
    const [episode, setEpisode] = useState({});
    const [characters, setCharacters] = useState([]);
    console.log(characters);
    useEffect(()=>{
        const fetchEpisode = async () => {
            const data = await getEpisodeById(id);
            setEpisode(data);
        }
        fetchEpisode();
    },[])
    
    useEffect(()=>{
        const fetchCharacters = async () => {
            const characters = episode.characters;
            const selectedCharacters = [
                ...characters.slice(0, 2),
                ...characters.slice(-2)

            ]
            const characterData = await Promise.all(selectedCharacters.map((character) => {
                return fetch(character).then((res) => res.json())
            }))
            setCharacters(characterData);
        }
        if (episode.characters) {
            fetchCharacters();
        }
    }, [episode.characters])


    return(
        <div>
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
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

async function getEpisodeById(id) {
    const episode = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    if (!episode.ok) {
        throw new Error("Failed to fetch episode")
    }
    return episode.json()
}