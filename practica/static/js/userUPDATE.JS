const button = document.querySelector("#update-user-button");


button.addEventListener("click", function(event){
    event.preventDefault();
    const form = document.querySelector("#update-user-form");
    const formData = new FormData(form);
    const data = {}
    const token = document.querySelector("#csrftoken").value;
    const userId = document.querySelector("#userId").value;
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(`/users/updateUserByFetch/${userId}`,{
        method: 'PATCH',
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