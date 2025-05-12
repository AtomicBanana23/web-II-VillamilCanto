import styles from '../style/propertyCard.module.css';

export default function MealCard({ id, image, title}) {
    return (
        <div key={id} className={styles.card}>
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
