const button = document.querySelector("#crear-producto-button");


button.addEventListener("click", function(event){
    event.preventDefault();
    const form = document.querySelector("#crear-producto-form");
    const formData = new FormData(form);
    const data = {}
    const token = document.querySelector("#csrftoken").value;
    formData.forEach((value, key) => {
        data[key] = value;
    });

    if(data['name'] == ''){

        alert("El nombre del producto no puede estar vacío", "error");
        return;
    
    }

    if(data['precio'] == '' || data['precio'] <= 0){
        alert("El precio del producto no puede estar vacío o ser negativo", "error");
        return;

    }

    fetch('createProducto',{
        method: 'POST',
        headers: {
            'X-CSRFToken': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(result => {
        if (result.error) {
            alert(result.error, "error");
        } else {
            alert("Producto creado exitosamente.", "exito");
            window.location.reload()
        }
    })
    .catch(error => {
        alert("Ocurrió un error inesperado");
        console.error("Error:", error);
    });

})
