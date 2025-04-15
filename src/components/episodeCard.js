export default function EpisodeCard({id, name, air_date, episode}){
    return(
            <div className="">
                <div className="">
                    <h3>{name}</h3>
                    <p>{id}</p>
                    <p>{air_date}</p>
                    <p>{episode}</p>
                </div>
            </div>
    )
}