import { useFormStatus } from "react-dom";
import "../style/createProduct.module.css";
import { useState, useEffect, useReducer } from "react";
import styles from '../style/createProduct.module.css';
import CreateProductActions from "../functions/CreateProductActions.js";

function productAction(state, action) {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };
        case "CREATE_PRODUCT":
            const data = {
                title: state.title,
                description: state.description,
                category: state.category,
                price: state.price,
                stock: state.stock,
                images: state.images,
            };
            console.log("WHAAAAAAAAAAAAAAA", data);
            return state;
        default:
            return state;
    }
}

export default function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const [product, dispatch] = useReducer(productAction, {
        title: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        images: [],
    });

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("https://dummyjson.com/products/categories");
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    function handleInputChange(e) {
        const { name, value } = e.target;
        dispatch({ type: "UPDATE_FIELD", field: name, value });
    }

    async function SubmitAction(formData) {
        const data = Object.fromEntries(formData);
        const response = await CreateProductActions(data);

        if (response?.id === undefined) {
            alert("Error al crear el producto");
            return;
        }

        const newProduct = localStorage.getItem("newProduct") != null
            ? JSON.parse(localStorage.getItem("newProduct"))
            : [];
        newProduct.push(response);

        const newProductString = JSON.stringify(newProduct);
        localStorage.setItem("newProduct", newProductString);
    }

    return (
        <div className={styles.create_product_container}>
            <h1>Create Product</h1>
            <form action="/api/products" method="POST">
                <div className={styles.form_group}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={product.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                    >
                        {categories.map((category) => (
                            <option key={category.slug} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="stock">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="images">Images</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={product.images}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <button
                className={styles.submit_button}
                type="submit"
                onClick={SubmitAction}
            >
                Create Product
            </button>
            <button onClick={() => dispatch({ type: "CREATE_PRODUCT" })}>
                Guardar
            </button>
        </div>
    );
}