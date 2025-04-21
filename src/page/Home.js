import style from '../style/home.module.css';
import PropertyCard from '../components/propertyCard';
import { useState, useEffect } from 'react';

export default function Home(){
    const [allProperties, setAllProperties] = useState([]);
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState(" ");

    console.log(allProperties);

    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        const filteredProperties = allProperties.filter((property) => {
            return property.description.toLowerCase().includes(filters.toLowerCase());
        });
        setProperties(filteredProperties);
    }, [filters, allProperties]);
    
    const fetchProperties = async (query = "") => {
        try {
          const res = await fetch(`https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json`);
          const data = await res.json();
          setAllProperties(data);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };

      const watchForChanges = (e) => {
        console.log(e.target.value);
        setFilters(e.target.value);
      }

    return(
        <div className={style.container}>
            <div className={style.home_image}>
                <h3>Book unique places to stay and things to do.</h3>
                <h3>Unforgettable trips start with Airbnb.</h3>
                <input type="text" placeholder="Try 'New York'" className={style.search_input} onChange={watchForChanges}/>
            </div>
            <div className={style.property_container}>
                {properties &&  properties.map((property =>{
                    return(
                            <PropertyCard 
                                key={property.id}
                                id={property.id}
                                image={property.image}
                                title={property.title}
                                description={property.description}
                                price={property.price} 
                                rating={property.rating}
                                people={property.capacity.people}
                                superHost={property.superhost}
                                bedrooms={property.capacity.bedrooms}
                            >
                            </PropertyCard>
                    )
                }))}
            </div>
        </div>
    )
}