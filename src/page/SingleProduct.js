import { data, useParams } from "react-router-dom"
import { useEffect } from "react";
import ProductListIem from "../components/productListItem";
export default function SingleProduct(){
    const {id} = useParams();
    useEffect(()=>{
        const fetchProduct = async () => {
            const data = await getProductById(id);
            console.log(data)
        }
        fetchProduct();
    },[id])
    return(
        <div>
            {data && <ProductListIem 
            title={data.title}
            id={data.id}
            description={data.description}
            ></ProductListIem>}
            <h1>Ahhhhhhhhhh: </h1>
            <p>Product id: {id}</p>
        </div>
    )
}

async function getProductById(id) {
    const product = await fetch(`https://dummyjson.com/products/${id}`)
    return product.json()
}