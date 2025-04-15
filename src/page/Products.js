import { useEffect, useState } from "react";
import ProductListItem from "../components/productListItem"
import { useNavigate } from "react-router-dom";
import styles from '../style/products.module.css';
export default function Products(){
    const hasTokenInLocalStorage = localStorage.getItem("token") !== null;
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState(null);
    const [word, setWord] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data.products);
        }
        fetchProducts();
    }, [])

    useEffect(() => {
        const hasWord = word !== null && word !== "" && word !== undefined;
        console.log(word)
        if(!hasWord){
            return;
        }

        const fetchProductsByWord = async () => {
            const data = await getProductsByWord(word);
            console.log(data)
            setProducts(data.products);
        }

        fetchProductsByWord();
    })
    
    if(!hasTokenInLocalStorage){
        navigate("/login")
        return;
    }
    return(
        <div>
            <div>
            <h1>Products</h1>
            <p>Esta es la pagina de inicio</p>
            <input type="text" onChange={(e) => setWord(e.target.value)} />
            <div className={styles.container_products}>
                {products && products.map((item) => {
                    return(
                        <div>
                            <ProductListItem 
                            title={item.title}
                            id={item.id}
                            description={item.description}
                            images={item.images}>
    
                            </ProductListItem>
                            <a href={`/product/${item.id}`}>View</a>
                            <button onClick={() => addToCart(item)}>Add to cart</button>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>


    )
}

async function getProducts() {
    const products = await fetch("https://dummyjson.com/products")
    return products.json()
}

async function getProductsByWord(word) {
    const products = await fetch(`https://dummyjson.com/products/search?q=${word}`)
    return products.json()
}

async function addToCart(product){

    const cart = localStorage.getItem("cart") || "[]";
    const cartParsed = JSON.parse(cart);
    let totalCost = 0;
    const uniqueProducts = cartParsed.filter(
        (item, index, self) =>
          index === self.findIndex((p) => p.id === item.id)
      );
    console.log(uniqueProducts);
    if(uniqueProducts.length >= 5) return;
    cartParsed.forEach((item) => {
        totalCost += item.price;
    })
    console.log(totalCost);
    if(totalCost > 10000) return;
    cartParsed.push(product);
    localStorage.setItem("cart", JSON.stringify(cartParsed));

}