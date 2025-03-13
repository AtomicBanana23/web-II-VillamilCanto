function MyButton({titulo, setContador, contador}){
    function sumar(){
        setContador(contador + 1)
    }
    return(
        <button onClick={sumar}>{titulo}</button>
    )
}

window.MyButton = MyButton;