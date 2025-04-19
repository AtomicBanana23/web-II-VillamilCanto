import style from '../style/home.module.css'

export default function Home(){
    return(
        <div>
            <div className={style.container}>
                <div className={style.image_container}></div>
                <div className={style.text_container}>
                    <h1>Bienvenidos!</h1>
                    <p>Este es un proyecto de React que utiliza la api de Rick & Morty</p>
                </div>
            </div>
        </div>
    )
}