import { use, useEffect, useState } from "react";
import styles from "../style/characterCard.module.css";
import styles2 from "../style/characterForm.module.css";
import CharacterCard from "../components/characterCard";

export default function CharacterList(){
    const [characters, setCharacters] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        status: "",
        species: "",
        type: "",
        gender: ""
    });

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async (query = "") => {
        try {
          const res = await fetch(`https://rickandmortyapi.com/api/character${query}`);
          const data = await res.json();
          setCharacters(data.results || []);
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
          ...prev,
          [name]: value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const query = buildQuery(filters);
        fetchCharacters(query);
      };

      const buildQuery = (filters) => {
        const params = new URLSearchParams();
        for (const key in filters) {
          if (filters[key]) {
            params.append(key, filters[key]);
          }
        }
        return "?" + params.toString();
      };

    return(
        <div>
            <div className={styles2.form_container}>
                <form onSubmit={handleSubmit} className={styles2.form}>
                    <input type="text" placeholder="Name" name="name" value={filters.name} onChange={handleChange}/>
                    <select name="status" value={filters.status} onChange={handleChange}>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>
                    <input type="text" placeholder="Species" name="species" value={filters.species} onChange={handleChange}/>
                    <input type="text" placeholder="Type" name="type" value={filters.type} onChange={handleChange}/>
                    <select name="gender" value={filters.gender} onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
            </div>
             <div className={styles.characters_container}>
                {characters && characters.map((character) => {
                    return (
                        <div>
                            <CharacterCard
                                key={character.id}
                                id={character.id}
                                name={character.name}
                                image={character.image}>
                            </CharacterCard>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}