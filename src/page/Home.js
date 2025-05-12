import style from '../style/home.module.css';
import MealCard from '../components/mealCard.js';
import { useState, useEffect } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Home(){
    const [allMeals, setAllMeals] = useState([]);
    const [meals, setMeals] = useState([]);
    const [filters, setFilters] = useState(" ");
    const [categories, setCategories] = useState([]);

    console.log(allMeals);

    useEffect(() => {
        fetchMeals();
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
            </div>
            <div className={style.body_container}>
                <div className={style.categories_container}>
                    <div>Categories</div>
                    {categories && categories.map((category) => {
                        return (
                            <div key={category.idCategory} className={style.category_card}>
                                <img src={category.strCategoryThumb} alt={category.strCategory} />
                                <h3>{category.strCategory}</h3>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <input type="text" placeholder="🔍Search recipes and more..." className={style.search_input} onChange={watchForChanges}/>
                    <div className={style.meal_container}>
                        {meals &&  meals.map((meal =>{
                            return(
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