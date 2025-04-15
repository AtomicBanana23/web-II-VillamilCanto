import styles from "../style/cart.module.css"
import { use, useEffect, useState } from "react"
export default function Cart(){
    const [cart, setCart] = useState(null);
    let totalCost = 0;
    cart && cart.map((item) => {
        totalCost += item.price;
    })

    useEffect(() => {
        const cart = localStorage.getItem("cart") || "[]";
        const cartParsed = JSON.parse(cart);
        setCart(cartParsed);
    }, [])

    return(
        <div>
            <h1>Cart</h1>
            <h2>Total cost: {totalCost}</h2>
            {cart && cart.map((item) => {
                return(
                    <div className={styles.cartItem}>
                        <img src={item.images[0]} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.price}</p>
                    </div>
                )
            })}
        </div>
    )
}