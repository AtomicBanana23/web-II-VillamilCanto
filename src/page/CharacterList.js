import { useEffect, useState } from "react";
import styles from "../style/characterCard.module.css";

export default function CharacterList(){
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            console.log("fetching characters");
            const data = await getCharacters();
            setCharacters(data.results);
        }
        fetchCharacters();
    }, [])

    return(
        <div>
             <div className={styles.characters_container}>
                {characters && characters.map((character) => {
                    return (
                        <div key={character.id}>
                            <img src={character.image} alt={character.name} />
                            <p>{character.name}</p>
                            <p>{character.likes}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

async function getCharacters() {
    const allCharacters = await fetch("https://rickandmortyapi.com/api/character");

    if (!allCharacters.ok) {
        throw new Error("Failed to fetch characters")
    };
    return allCharacters.json()
}