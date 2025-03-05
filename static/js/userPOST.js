const button = document.querySelector("#create-user-button");


button.addEventListener("click", function(event){
    event.preventDefault();
    const form = document.querySelector("#create-user-form");
    const formData = new FormData(form);
    const data = {}
    const token = document.querySelector("#csrftoken").value;
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(USER_CREATE_URL,{
        method: 'POST',
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

})