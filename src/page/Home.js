import style from '../style/home.module.css';
import MealCard from '../components/mealCard.js';
import { useState, useEffect } from 'react';

export default function Home(){
    const [allMeals, setAllMeals] = useState([]);
    const [meals, setMeals] = useState([]);
    const [filters, setFilters] = useState(" ");

    console.log(allMeals);

    useEffect(() => {
        fetchMeals();
    }, []);

    useEffect(() => {
        const filteredMeals = allMeals.filter((meal) => {
            return meal.strMeal.toLowerCase().includes(filters.toLowerCase());
        });
        setMeals(filteredMeals);
    }, [filters, allMeals]);
    
    const fetchMeals = async (query = "") => {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`);
          const data = await res.json();
          setAllMeals(data.meals);
        } catch (error) {
          console.error("Error fetching meals:", error);
        }
      };

      const watchForChanges = (e) => {
        console.log(e.target.value);
        setFilters(e.target.value);
      }

    return(
        <div className={style.container}>
            <div className={style.home_image}>
                <h3>All your favourite recipies.</h3>
                <h3>For every day meals.</h3>
                <input type="text" placeholder="Try 'Soup'" className={style.search_input} onChange={watchForChanges}/>
            </div>
            <div className={style.meal_container}>
                {meals &&  meals.map((meal =>{
                    return(
                            <MealCard 
                                key={meal.idMeal}
                                id={meal.idMeal}
                                image={meal.strMealThumb}
                                title={meal.strMeal}
                            >
                            </MealCard>
                    )
                }))}
            </div>
        </div>
    )
}