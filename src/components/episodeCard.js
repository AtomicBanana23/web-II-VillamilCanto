import greenPortal from '../imgs/greenPortal.jpg';
import styles from '../style/episodeCard.module.css';

export default function EpisodeCard({id, name, air_date, episode}){
    return(
            <div className={styles.card}>
                <div>
                    <img src={greenPortal} alt="Episode" />
                </div>
                <div>
                    <h3 classname={styles.h3}>{name}</h3>
                    <p className={styles.p}>Id: {id}</p>
                    <p className={styles.p}>{air_date}</p>
                    <p className={styles.p}>{episode}</p>
                </div>
            </div>
    )
}