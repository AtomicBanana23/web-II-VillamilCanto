document.querySelectorAll(".boton-ver-boletos").forEach(boton =>{
    boton.addEventListener("click", function(){
        const id = boton.getAttribute("data-id");
        const data ={}
        data["id"] = id

        window.location.href = "verBoletos/" + id
    })
})