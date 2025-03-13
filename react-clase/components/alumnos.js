function Alumnos({alumno, index}){

    const { useState } = React;
    const [visible, setVisible] = useState(true);

    function verParrafo(){
        setVisible(!visible);
    }

    return(
        <div>
            <div key={index} style={{ display: visible ? "block" : "none" }}>
            <p>Este es el alumno {alumno.nombre}</p>
            <p>Calificación {alumno.calificacion}</p>
            <p>Materia {alumno.materia}</p>
            </div>
            <button onClick={verParrafo}>Ver párrafo</button>
        </div>
    )

}

window.Alumnos = Alumnos;