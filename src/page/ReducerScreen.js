import { useReducer } from 'react';
import { useState } from 'react';

function calculadora(state, action){
    if(action.type === "add"){
        return{
            numero:state.numero + 1
        }
    }

    if(action.type === "sub"){
        return{
            numero:state.numero - 1
        }
    }
}

export default function ReducerScreen() {
    const [state, dispatch] = useReducer(calculadora, {numero:0})
    const [numero, setNumero] = useState(0) 
    return(
        <div>
            <h1>Reducer Screen</h1>
            <button onClick={() => dispatch({type: "add"})}>Add</button>
            <h2>{state.numero}</h2>
            <button onClick={() => dispatch({type: "sub"})}>Sub</button>
        </div>
    )
}