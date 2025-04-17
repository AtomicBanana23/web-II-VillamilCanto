import { useEffect, useState } from "react";
import EpisodeCard from "../components/episodeCard";
import { useNavigate } from "react-router-dom";

export default function Episodes() {

    const [episodeData, setEpisodeData] = useState([]);

    useEffect(() => {
            const fetchEpisodes = async () => {
                const data = await getEpisodes();
                setEpisodeData(data.results);
            }
            fetchEpisodes();
        }, [])

    return(
        <div>
            <h1>Episodes</h1>
            <div className="">
                {episodeData && episodeData.map((item) => {
                    return(
                        <div>
                            <EpisodeCard 
                            id={item.id}
                            name={item.name}
                            air_date={item.air_date}
                            episode={item.episode}>
    
                            </EpisodeCard>
                            <a href={`/episode/${item.id}`}>View</a>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}

async function getEpisodes() {
    const episodes = await fetch("https://rickandmortyapi.com/api/episode")

    if (!episodes.ok) {
        throw new Error("Failed to fetch episodes")
    }
    return episodes.json()
}