document.querySelectorAll(".boton-eliminar").forEach(boton =>{
    boton.addEventListener("click", function(){
        const token = document.querySelector("#csrftoken").value;
        const id = boton.getAttribute("data-id");
        const data ={}
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este evento?");
        if(confirmacion){
            data["id"] = id

            fetch(`borrarEvento`,{
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then(value => {
                console.log(value);
            }).catch(error => {
                console.error(error);
            });

            window.location.reload();
        }
    })
})