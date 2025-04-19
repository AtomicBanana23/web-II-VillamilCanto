import styles from "../style/characterCard.module.css";

export default function CharacterCard({id, name, image}){
    return(
        <div key={id}>
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    )
}