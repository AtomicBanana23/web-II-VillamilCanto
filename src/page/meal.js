export default function Meal(){
    const id = useParams().id;

    return(
        <div>
            <h1>Meal {id}</h1>
        </div>
    )
}