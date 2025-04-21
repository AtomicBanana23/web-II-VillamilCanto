import styles from '../style/propertyCard.module.css';
import { FaBed, FaUserFriends, FaStar } from 'react-icons/fa';

export default function PropertyCard({ id, image, title, description, price, rating, people, superHost, bedrooms }) {
    return (
        <div key={id} className={styles.card}>
            <div className={styles.image_container}>
                <img src={image} alt={title} />
                {superHost && <span className={styles.superhost}>Superhost ⭐</span>}
            </div>
            <div className={styles.content}>
                <h2>{title}</h2>
                <p className={styles.description}>{description}</p>
                <div className={styles.info}>
                    <span><FaBed /> {bedrooms} BedRoom</span>
                    <span><FaUserFriends /> {people} Guest</span>
                </div>
                <hr />
                <div className={styles.footer}>
                    <p>${price}/night</p>
                    <p><FaStar className={styles.star} /> {rating}</p>
                </div>
            </div>
        </div>
    );
}
