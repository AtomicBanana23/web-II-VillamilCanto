import styles from '../style/mealCard.module.css';
import { useNavigate } from 'react-router-dom';

export default function MealCard({ id, image, title}) {
    const navigate = useNavigate();
    return (
        <div key={id} className={styles.card} onClick={() => navigate(`/meal/${id}`)}>
            <div className={styles.image_container}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.content}>
                <h2>{title}</h2>
                <hr />
            </div>
        </div>
    );
}
