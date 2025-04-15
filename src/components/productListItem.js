import { Navigate } from "react-router-dom";
import styles from "../style/productListItem.module.css";
export default function ProductListItem({title, id, description, images}){
    const image = images?.[0] || "";
    return(
            <div className={styles.product_list_item}>
                <div className={styles.product_img}>
                    <img src={image} alt="Product" />
                </div>
                <div className={styles.product_details}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
    )
}