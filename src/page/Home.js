import style from '../style/home.module.css';
import MealCard from '../components/mealCard.js';
import gato from '../imgs/gato.png';
import { useState, useEffect } from 'react';

export default function Home() {
    const [allMeals, setAllMeals] = useState([]);
    const [meals, setMeals] = useState([]);
    const [filters, setFilters] = useState(" ");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchMeals("Beef");
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
                const data = await res.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const filteredMeals = allMeals.filter((meal) => {
            return meal.strMeal.toLowerCase().includes(filters.toLowerCase());
        });
        setMeals(filteredMeals);
    }, [filters, allMeals]);

    const fetchMeals = async (query = "Beef") => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
            const data = await res.json();
            setAllMeals(data.meals);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };

    const watchForChanges = (e) => {
        setFilters(e.target.value);
    }

    const orderBy = () => {
        const sortedMeals = [...meals].reverse();
        setMeals(sortedMeals);
        setMeals(sortedMeals);
    }

    return (
        <div className={style.container}>
            <div className={style.home_image}>
                <img src ={gato} alt="home" />
            </div>
            <div className={style.body_container}>
                <div className={style.title_container}>
                    <h1 className={style.categories}>Categories</h1>
                    <div className={style.categories_container}>
                        {categories && categories.map((category) => {
                            return (
                                <div key={category.idCategory} className={style.category_card} onClick={() => fetchMeals(category.strCategory)}>
                                    <img src={category.strCategoryThumb} alt={category.strCategory} />
                                    <h3>{category.strCategory}</h3>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div>
                        <input type="text" placeholder="🔍Search recipes and more..." className={style.search_input} onChange={watchForChanges} />
                        <button className={style.orderBy} onClick={() => orderBy()}>Order By</button>
                    </div>
                    <div className={style.meal_container}>
                        {meals && meals.map((meal => {
                            return (
                                <MealCard
                                    key={meal.idMeal}
                                    id={meal.idMeal}
                                    image={meal.strMealThumb}
                                    title={meal.strMeal}
                                ></MealCard>
                            )
                        }))}
                    </div>
                </div>
            </div>
        </div>
    )
}