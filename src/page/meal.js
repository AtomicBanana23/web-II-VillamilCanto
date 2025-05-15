import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from '../style/singleMeal.module.css';


export default function Meal() {
    const id = useParams().id;
    const [meal, setMeal] = useState(null);
    
    useEffect(() => {
        const localData = localStorage.getItem(`meal${id}`);
        if (localData) {
            setMeal(JSON.parse(localData));
        } else {
            const fetchMeal = async () => {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await res.json();
                localStorage.setItem(`meal${id}`, JSON.stringify(data.meals[0]));
                setMeal(data.meals[0]);
            };
            fetchMeal();
        }
    }, [id]);

    const deleteIngredient = (key) => {
        const updatedMeal = { ...meal };
        delete updatedMeal[key];
        setMeal(updatedMeal);
        localStorage.setItem(`meal${id}`, JSON.stringify(updatedMeal));
    }

    if (!meal) {
        return <div className={style.meal_container}>Loading...</div>;
    }
    
    return (
        <div className={style.meal_container}>
            <a href="http://localhost:3000">Back</a>
            <div className={style.meal_center}>
                <h2>🍽 Meal: {meal.strMeal}</h2>
                <h3>📂 Category: {meal.strCategory}</h3>

                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className={style.meal_image}
                />

                <div className={style.section}>
                    <h4>🧂 Ingredients</h4>
                    <ul>
                        {Object.keys(meal).map((key) => {
                            if (key.startsWith("strIngredient") && meal[key]) {
                                return (
                                    <li key={key}>
                                        {meal[key]} - {meal[`strMeasure${key.slice(13)}`]}
                                        <button onClick={() => deleteIngredient(key)}>X</button>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </div>

            <div className={style.section}>
                <h4>📖 Instructions</h4>
                <p>{meal.strInstructions}</p>
            </div>

            {meal.strYoutube && (
                <div className={style.section}>
                    <h4>▶️ Watch on YouTube</h4>
                    <div className={style.video_container}>
                        <iframe
                            src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    )
}